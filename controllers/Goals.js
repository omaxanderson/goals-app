import { get } from 'lodash';
import Goals from '../models/Goals';
import * as ListController from './List';
import Db from '../database/db';
import Error from '../errors/Error';

// @TODO put this into some sort of shared module so there's one source of truth
const tables = {
   weekly: 'weekly_goal_completed',
   custom: 'custom_goal_completed',
   weekdays: 'weekday_goal_completed',
   endDate: 'end_date_goal_completed',
   daily: 'daily_goal_completed',
};

// Tbh this goal param should be a class or at least some sort of
// defined object but eh fuck it.
async function hydrateReview(goal) {
   const sql = `SELECT *
      FROM ${tables[goal.schedule_type]}
      WHERE goal_id = ${goal.goal_id}`;
   const review = await Db.query(sql);
   return review;
}

// Keeping this because we might want to add in some filtering capabilities later on
/* eslint-disable-next-line no-unused-vars */
export const getAll = async (userId, params) => {
   const { f_goal_types } = params;
   const where = [];

   // Here is where we're going to start putting various filter/sorting options
   // and building out the query
   //    Depending on the scope and if we want to use this elsewhere,
   //    this should be a global service
   if (f_goal_types) {
      where.push(`AND schedule_type IN (${f_goal_types.split(',').map(type => Db.format('?', [type])).join(',')})`);
   }

   const sql = `SELECT *
      FROM goals
         JOIN goal_schedule USING (goal_id)
      WHERE 1
      ${where.join(' ')}`;

   const results = await Db.query(sql);

   const listPromise = ListController.index();
   const hydrated = results.map(async (goal) => {
      const completed = await hydrateReview(goal);
      return {
         ...goal,
         completed,
      };
   });

   const promises = await Promise.all([listPromise, ...hydrated]);

   const listOrder = promises[0];
   const goals = promises.slice(1);
   // console.log(goals);


   // console.log(results);
   return {
      metadata: {
         total: goals.length,
      },
      list: listOrder,
      results: goals,
   };
};

export const create = async (data) => {
   try {
      const {
         title,
         description,
         scheduleType,
         startDate,
         endDate,
      } = data;

      const amount = get(data, 'customSchedule.amount', null);
      let amountType = get(data, 'customSchedule.amountType', null);
      let perType = get(data, 'customSchedule.perType', null);
      switch (amountType) {
      case '0': amountType = 'time'; break;
      case '1': amountType = 'minute'; break;
      case '2': amountType = 'hour'; break;
      case '3': amountType = 'day'; break;
      default:
      }
      switch (get(data, 'customSchedule.perType', null)) {
      case '3': perType = 'day'; break;
      case '4': perType = 'week'; break;
      case '5': perType = 'month'; break;
      default:
      }

      console.log(startDate);
      /* eslint-disable camelcase */
      const goalsInsert = await Db.insert('goals', {
         title,
         description,
         goal_reached: 0,
         start_date: startDate,
      });
      /* eslint-enable camelcase */

      const weekdayList = data.weekdays && data.weekdays.split(',');
      const weekdays = scheduleType === 'weekdays'
         ? {
            sunday: Number(weekdayList.includes('SU')),
            monday: Number(weekdayList.includes('M')),
            tuesday: Number(weekdayList.includes('T')),
            wednesday: Number(weekdayList.includes('W')),
            thursday: Number(weekdayList.includes('TH')),
            friday: Number(weekdayList.includes('F')),
            saturday: Number(weekdayList.includes('S')),
         }
         : {};
      console.log(weekdays);

      /* eslint-disable camelcase */
      const scheduleInsert = await Db.insert('goal_schedule', {
         goal_id: goalsInsert.insertId,
         end_date: endDate,
         schedule_type: scheduleType,
         ...weekdays,
         custom_amount: amount,
         custom_amount_type: amountType,
         custom_per_type: perType,
      });
      /* eslint-enable camelcase */

      return {
         goalsInsert,
         scheduleInsert,
      };
   } catch (e) {
      console.log(e);
      const error = new Error({ error: 'oops' });
      throw error.what();
   }
};

export const update = async (goalId, data) => {
   const goal = new Goals();
   await goal.loadById(goalId);

   /* eslint-disable guard-for-in */
   for (const column of Object.keys(data)) {
      goal[column] = data[column];
   }
   /* eslint-enable guard-for-in */

   try {
      return await goal.save();
   } catch (e) {
      console.log('catching and throwing from controller');
      throw e;
   }
};

export const remove = async (goalId) => {
   const goal = new Goals(goalId);
   const result = await goal.remove();
   return result;
};

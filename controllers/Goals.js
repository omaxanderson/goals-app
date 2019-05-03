import QueryBuilder from '../database/QueryBuilder';
import Goals from '../models/Goals';
import Db from '../database/db';
import { get } from 'lodash';

export const getAll = async (userId, params) => {
   const sql = `SELECT *
      FROM goals
         JOIN goal_schedule USING (goal_id)`;
   const results = await Db.query(sql);
   console.log(results);
   return {
      metadata: {
         total: results.length,
      },
      results,
   };
}

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
      }
      switch (get(data, 'customSchedule.perType', null)) {
         case '3': perType = 'day'; break;
         case '4': perType = 'week'; break;
         case '5': perType = 'month'; break;
      }

      const goalsInsert = await Db.insert('goals', {
         title,
         description,
         goal_reached: 0,
         start_date: startDate,
      });

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

      const scheduleInsert = await Db.insert('goal_schedule', {
         goal_id: goalsInsert.insertId,
         end_date: endDate,
         schedule_type: scheduleType,
         ...weekdays,
         custom_amount: amount,
         custom_amount_type: amountType,
         custom_per_type: perType,
      });

      return {
         goalsInsert,
         scheduleInsert,
      }
   } catch (e) {
      console.log(e);
      throw e;
   }

   /*
   try {
      return await goal.save();
   } catch (e) {
      return e;
   }
   */
}

export const update = async (goalId, data) => {
   const goal = new Goals();
   await goal.loadById(goalId);

   for (const column in data) {
      goal[column] = data[column];
   }

   try {
      return await goal.save();
   } catch (e) {
      console.log('catching and throwing from controller');
      throw e;
   }
}

export const remove = async (goalId) => {
   const goal = new Goals(goalId);
   const result = await goal.remove();
   return result;
}

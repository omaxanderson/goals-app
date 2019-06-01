import moment from 'moment';
import Db from '../database/db';
import { getScheduleType, getCustomSchedule } from '../services/Goals';

async function setDailyComplete(goalId, completed) {
   const sql = Db.format(`REPLACE INTO daily_goal_completed
      VALUES (?, CURDATE(), ?)`, [goalId, completed]);
   const result = await Db.query(sql);
   return result;
}

async function setWeeklyComplete(goalId, completed) {
   const sql = Db.format(`REPLACE INTO weekly_goal_completed
      VALUES (?, ?, ?, ?)`, [goalId, completed, moment().week(), moment().year()]);
   const result = await Db.query(sql);
   return result;
}

// @TODO rename table from weekday_ to weekdays_
async function setWeekdaysComplete(goalId, completed) {
   const sql = Db.format(`REPLACE INTO weekday_goal_completed
      VALUES (?, CURDATE(), ?)`, [goalId, completed]);
   const result = await Db.query(sql);
   return result;
}

// @TODO rename the end date column from end_date to completed_date
async function setEndDateComplete(goalId, completed) {
   const sql = Db.format(`REPLACE INTO end_date_goal_completed
      VALUES (?, CURDATE(), ?)`, [goalId, completed]);
   const result = await Db.query(sql);
   return result;
}

async function setCustomComplete(goalId, amount) {
   console.log(goalId, amount);
   const customDetails = await getCustomSchedule(goalId);
   const { custom_per_type } = customDetails;
   let column;
   let value;
   /* eslint-disable-next-line camelcase */
   switch (custom_per_type) {
   case 'month':
      column = 'month';
      value = moment().month();
      break;
   case 'week':
      column = 'week';
      value = moment().week();
      break;
   case 'day':
      column = 'date';
      value = moment().format('YYYY-MM-DD');
      break;
   default:
   }

   const sql = Db.format(`REPLACE INTO custom_goal_completed
      (goal_id, ??, year, amount)
      VALUES (?, ?, ?, ?)`, [column, goalId, value, moment().year(), amount]);
   console.log(sql);
   const result = await Db.query(sql);
   return result;
}

export async function setCompleted(goalId, completed) {
   // get the schedule type
   const scheduleType = await getScheduleType(goalId);

   // @TODO look into some sort of dynamic function call similar to what
   // we're doing with the database tables?
   switch (scheduleType) {
   case 'daily':
      setDailyComplete(goalId, completed);
      break;
   case 'weekly':
      setWeeklyComplete(goalId, completed);
      break;
   case 'weekdays':
      // @TODO should probably do some additional validation here to ensure that the
      // goal is active today
      setWeekdaysComplete(goalId, completed);
      break;
   case 'custom':
      setCustomComplete(goalId, completed);
      break;
   case 'endDate':
      setEndDateComplete(goalId, completed);
      break;
   default:
   }

   /*
   console.log(`setting goal ${goalId} to ${completed || 'not'} complete`);
   const sql = Db.format(`UPDATE goals
      SET completed = ?
      WHERE goal_id = ?`, [completed ? 1 : 0, goalId]);
   //console.log(sql);
   const result = await Db.query(sql);
   //const scheduleType = result[0].schedule_type;
   return JSON.stringify(result);
   */
   return JSON.stringify({ hello: 'world' });
}

export default { nice: 'max' };

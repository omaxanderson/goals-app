import Db from '../database/db';
import { getScheduleType } from '../services/Goals';

const tables = {
   'weekly': 'weekly_goal_completed',
   'custom': 'custom_goal_completed',
   'weekdays': 'weekdays_goal_completed',
   'endDate': 'end_date_goal_completed',
   'daily': 'daily_goal_completed',
};

async function setDailyComplete(goalId, completed) {
   const sql = Db.format(`REPLACE INTO daily_goal_completed
      VALUES (?, CURDATE(), ?)`, [goalId, completed]);
   const result = await Db.query(sql);
   return result;
}

export async function setCompleted(goalId, completed) {
   // get the schedule type
   const scheduleType = await getScheduleType(goalId);

   switch(scheduleType) {
      case 'daily':
         setDailyComplete(goalId, completed);
      case 'weekly':
      case 'weekdays':
      case 'custom':
      case 'endDate':
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

export default {nice: 'max'};

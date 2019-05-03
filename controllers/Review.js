import Db from '../database/db';

const tables = {
   'weekly': 'weekly_goal_completed',
   'custom': 'custom_goal_completed',
   'weekdays': 'weekdays_goal_completed',
   'endDate': 'end_date_goal_completed',
   'daily': 'daily_goal_completed',
};

export async function test(goalId) {
   const sql = `SELECT schedule_type
      FROM goal_schedule
      WHERE goal_id = ${goalId}`;
   const result = await Db.query(sql);
   const scheduleType = result[0].schedule_type;
   return JSON.stringify({hello: 'world'});
}

export default {nice: 'max'};

import Db from '../database/db';

export async function getScheduleType(goalId) {
   const sql = Db.format(`SELECT schedule_type
      FROM goal_schedule
      WHERE goal_id = ?`, [goalId]);
   const result = await Db.fetchOne(sql);
   return result.schedule_type;
}

export async function getCustomSchedule(goalId) {
   const sql = Db.format(`SELECT custom_amount, custom_amount_type, custom_per_type
      FROM goal_schedule
      WHERE goal_id = ?`, [goalId]);
   const result = await Db.fetchOne(sql);
   return result;
}

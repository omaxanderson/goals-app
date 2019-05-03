import Db from '../database/db';

export async function getScheduleType(goalId) {
   const sql = Db.format(`SELECT schedule_type
      FROM goal_schedule
      WHERE goal_id = ?`, [goalId]);
   const result = await Db.fetchOne(sql);
   return result.schedule_type;
}

import Db from '../database/db';
import moment from 'moment';

(async () => {
   const scheduleType = process.argv[2];
   // for every daily goal
   const goals = await Db.query(Db.format(`SELECT *
      FROM goal_schedule
      WHERE schedule_type = ?`, [scheduleType]));
   if (scheduleType === 'weekly') {
      const weekNumber = moment().week();
      // for each goal, insert ignore?
      for (const goal of goals) {
         const result = await Db.query(Db.format(`INSERT IGNORE INTO weekly_goal_completed
            VALUES (?, 0, ?, ?)`, [goal.goal_id, moment().week() - 1, moment().year()]));
         console.log(result);
      }

      console.log(weekNumber);
   }
   console.log(goals);
})();

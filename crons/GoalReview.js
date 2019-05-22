import Db from '../database/db';
import moment from 'moment';
import get from 'lodash/get';

(async () => {
   class GoalReview {
      weekly = async () => {
         // weeks start on sunday and end on saturday
         //    we'll want to run this on saturday night I think
         const weekNumber = moment().week();
         for (const goal of this.goals) {
            Db.query(`INSERT IGNORE INTO weekly_goal_completed
               VALUES (?, 0, ?, ?)`, [goal.goal_id, moment().week(), moment().year()]);
         }

         const customGoals = await Db.query(`SELECT *
            FROM goal_schedule
            WHERE schedule_type = 'custom'
            AND custom_per_type = 'week'`
         );

         for (const goal of customGoals) {
            Db.query(`INSERT IGNORE INTO custom_goal_completed (goal_id, amount, week, year)
               VALUES (?, 0, ?, ?)`, [goal.goal_id, moment().week(), moment().year()]);
         }
      }

      daily = async () => {
         const date = moment().format('YYYY-MM-DD');
         for (const goal of this.goals) {
            Db.query(`INSERT IGNORE INTO daily_goal_completed
               VALUES (?, ?, 0)`, [goal.goal_id, date]);
         }

         const customGoals = await Db.query(`SELECT *
            FROM goal_schedule
            WHERE schedule_type = 'custom'
            AND custom_per_type = 'day'`
         );

         for (const goal of customGoals) {
            Db.query(`INSERT IGNORE INTO custom_goal_completed (goal_id, date, amount, year)
               VALUES (?, ?, 0, ?)`, [goal.goal_id, moment().format('YYYY-MM-DD'), moment().year()]);
         }
      }

      custom = async () => {
         if (this.customExtra === 'monthly') {
            this.monthly();
         } else {
            console.log(this.customExtra);
         }
      }

      weekdays = async () => {
         for (const goal of this.goals) {
            Db.query(`INSERT IGNORE INTO weekday_goal_completed
               VALUES (?, ?, 0)`, [goal.goal_id, moment().format('YYYY-MM-DD')]);
         }
      }

      endDate = async () => {
         for (const goal of this.goals) {
            Db.query(`INSERT IGNORE INTO end_date_goal_completed
               VALUES (?, ?, 0)`, [goal.goal_id, moment().format('YYYY-MM-DD')]);
         }
      }

      monthly = async () => {
         for (const goal of this.goals) {
            Db.query(`INSERT IGNORE INTO custom_goal_completed (goal_id, month, year)
               VALUES (?, ?, ?)`, [goal.goal_id, moment().month(), moment().year()]);
         }
      }

      init = async (scheduleType, customExtra) => {
         this.scheduleType = scheduleType;
         this.customExtra = customExtra;
         const sql = Db.format(`SELECT *
               FROM goal_schedule
               WHERE schedule_type = ?`, [scheduleType]);

         const extra = {
            weekdays: `AND ${moment().format('dddd').toLowerCase()} = 1`,
            endDate: Db.format('AND end_date = ?', [moment().format('YYYY-MM-DD')]),
            custom: {
               monthly: `AND custom_per_type = 'month'`,
            }
         }

         const objectPath = scheduleType + (customExtra ? `.${customExtra}` : '');
         const extraSql = get(extra, objectPath, '');
         this.goals = await Db.query(`${sql} ${extraSql}`);
      }
   }

   const goalReview = new GoalReview();
   await goalReview.init(process.argv[2], process.argv[3]);
   goalReview[process.argv[2]]();
})()

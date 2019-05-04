export default `ALTER TABLE weekly_goal_completed
   DROP PRIMARY KEY,
   DROP COLUMN start_date,
   DROP COLUMN end_date,
   ADD COLUMN week_number INT,
   ADD COLUMN year INT,
   ADD PRIMARY KEY (goal_id, week_number, year)`;

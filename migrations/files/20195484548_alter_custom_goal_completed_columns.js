export default `ALTER TABLE custom_goal_completed
   DROP PRIMARY KEY,
   DROP COLUMN start_date,
   DROP COLUMN end_date,
   ADD COLUMN week INT,
   ADD COLUMN month INT,
   ADD COLUMN year INT,
   ADD PRIMARY KEY (goal_id, date, week, month, year),
   ADD UNIQUE INDEX date (goal_id, date),
   ADD UNIQUE INDEX week (goal_id, week, year),
   ADD UNIQUE INDEX month (goal_id, month, year)
`;

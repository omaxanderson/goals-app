export default `CREATE TABLE weekly_goal_completed (
   goal_id INT,
   start_date DATE,
   end_date DATE,
   completed INT(1),
   PRIMARY KEY (goal_id, start_date)
)`;

export default `CREATE TABLE weekday_goal_completed (
   goal_id INT,
   date DATE,
   completed INT(1),
   PRIMARY KEY (goal_id, date)
)`;

export default `CREATE TABLE daily_goal_completed (
   goal_id INT,
   date DATE,
   completed INT(1) DEFAULT 0,
   PRIMARY KEY (goal_id, date)
)`;

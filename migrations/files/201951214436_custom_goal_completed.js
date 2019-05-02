export default `CREATE TABLE custom_goal_completed (
   goal_id INT,
   date DATE,
   start_date DATE,
   end_date DATE,
   completed INT(1),
   PRIMARY KEY (goal_id, date)
)`;

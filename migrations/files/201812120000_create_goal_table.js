export default `CREATE TABLE goals (
   goal_id INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(100) NOT NULL,
   description VARCHAR(255),
   goal_reached INT(1) NOT NULL DEFAULT 0,
   user_id INT
)`;

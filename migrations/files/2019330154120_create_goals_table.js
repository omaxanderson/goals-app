export default `CREATE TABLE goals (
	goal_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT NOT NULL,
	title VARCHAR(250),
	description TEXT,
	start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	end_date DATETIME,
	goal_reached TINYINT DEFAULT 0,
	INDEX user_id (user_id),
	INDEX title (title)
)`;

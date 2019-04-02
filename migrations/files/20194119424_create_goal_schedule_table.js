export default `CREATE TABLE goal_schedule (
	goal_id INT,
	start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	end_date DATETIME,
	is_recurring TINYINT DEFAULT 0,
	daily TINYINT DEFAULT 0,
	weekly INT DEFAULT 0,
	monthly INT DEFAULT 0,
	yearly INT DEFAULT 0,
	PRIMARY KEY (goal_id)
)`;

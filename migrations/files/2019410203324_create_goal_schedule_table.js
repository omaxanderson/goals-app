export default `CREATE TABLE goal_schedule (
	goal_id INT PRIMARY KEY,
	schedule_type VARCHAR(15) NOT NULL,
	end_date DATETIME,
	sunday TINYINT(1) DEFAULT 0,
	monday TINYINT(1) DEFAULT 0,
	tuesday TINYINT(1) DEFAULT 0,
	wednesday TINYINT(1) DEFAULT 0,
	thursday TINYINT(1) DEFAULT 0,
	friday TINYINT(1) DEFAULT 0,
	saturday TINYINT(1) DEFAULT 0,
	custom_amount INT,
	custom_amount_type VARCHAR(15),
	custom_per_type VARCHAR(15)
)`;

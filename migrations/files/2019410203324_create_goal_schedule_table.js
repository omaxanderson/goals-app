export default `CREATE TABLE goal_schedule (
	goal_id INT PRIMARY KEY,
	schedule_type INT NOT NULL COMMENT '1 = end date, 2 = weekdays, 3 = custom, 4 = daily, 5 = weekly',
	end_date DATETIME,
	sunday TINYINT,
	monday TINYINT,
	tuesday TINYINT,
	wednesday TINYINT,
	thursday TINYINT,
	friday TINYINT,
	saturday TINYINT,
	custom_amount INT,
	custom_amount_type VARCHAR(15),
	custom_per_type VARCHAR(15)
)`;

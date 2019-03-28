export default `CREATE TABLE migration (
	migration_id INT PRIMARY KEY AUTO_INCREMENT,
	migration_name VARCHAR(100) NOT NULL,
	date_run DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

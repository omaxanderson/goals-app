import mysql from 'mysql';
import config from './config';

export default class Db {
	static query(sql) {
		return new Promise((resolve, reject) => {
			const connection = mysql.createConnection(config);
			connection.connect();

			connection.query(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
				connection.end();
			});
		});
	}
	
	static format(sql, params) {
		return mysql.format(sql, params);
	}
}

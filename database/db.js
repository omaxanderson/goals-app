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

	/* Insert a row into the database
	 *
	 * @param table String
	 * @param values Object - contains the key-value pairs that are to be inserted
	 * @param ignore Boolean - whether or not to INSERT IGNORE
	 */
	static insert(table, values, ignore = false) {
		const columns = Db.format(Object.keys(values).filter(key => values[key]).join(', '));
		const data = Db.format(Object.values(values).filter(value => value)
			.map(value => (typeof value !== 'number' ? `'${value}'` : value))
			.join(', '));
		const sql = `INSERT ${ignore ? 'IGNORE ' : ''}INTO ${table} (${columns}) VALUES (${data})`;
		console.log(sql);
		return this.query(sql);
	}
}

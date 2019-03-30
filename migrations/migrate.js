const QueryBuilder = require('../database/QueryBuilder').default;
const Db = require('../database/db').default;
const fs = require('fs');

const run = async () => {
	// Get a list of the files in the directory
	const files = fs.readdirSync('./migrations/files');

	// Get a list of files already run
	try {
		const q = new QueryBuilder();
		const results = await q.addSelect('migration_name')
			.from('migration')
			.execute();
		const migrationsRun = results.map(result => result.migration_name);

		const migrationsNotRun = files.filter(migration => !migrationsRun.includes(migration));

		// Run each migration in order
		migrationsNotRun.sort();

		migrationsNotRun.forEach(async (migration) => {
			const migrationSql = require(`./files/${migration}`).default;
			if (migrationSql !== 'QUERY') {
				try {
					const result = await Db.query(migrationSql);

					// if the migration ran, insert it into the database
					const insertResult = await Db.query(`INSERT INTO migrations (migration_name) VALUES ('${migration}')`);

					console.log(`${migration} ran successfully.`);
				} catch (e) {
					console.log(`Error on migration ${migration}: `);
					console.log(e);
				}
			}
		});

	} catch (err) {
		// likely the migrations table doesn't exist, so we need to just run it anyway
		// Also I feel like this is pretty bad coding practice but eh whatever
		console.log(err);
		if (err.code === 'ER_NO_SUCH_TABLE') {
			console.log('creating initial migration table');
			const initialMigrationTableSql = require('./files/2019327223714_create_migration_table.js').default;
			await Db.query(initialMigrationTableSql);
		} else {
			console.log(err);
		}
	}

};

run();

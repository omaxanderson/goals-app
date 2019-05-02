const QueryBuilder = require('../database/QueryBuilder').default;
const Db = require('../database/db').default;
const fs = require('fs');

const getMigrationsToRun = async () => {
   // Get a list of the files in the directory
   const files = fs.readdirSync('./migrations/files');
   // Get a list of files already run
   try {
      const q = new QueryBuilder();
      const results = await q.addSelect('migration_name')
         .from('migrations')
         .execute();
      const migrationsRun = results.map(result => result.migration_name);

      const migrationsNotRun = files.filter(migration => !migrationsRun.includes(migration));

      // Sort them by filename timestamp
      migrationsNotRun.sort();
      return migrationsNotRun;
   } catch (err) {
      // likely the migrations table doesn't exist, so we need to just run it anyway
      // Also I feel like this is pretty bad coding practice but eh whatever
      if (err.code === 'ER_NO_SUCH_TABLE') {
         console.log('Creating initial migration table...');
         const initialMigrationTableSql = require('./files/2019327223714_create_migration_table.js').default;
         await Db.query(initialMigrationTableSql);
         await Db.query(`INSERT INTO migrations (migration_name) VALUES ('2019327223714_create_migration_table.js')`);
      } else {
         console.log(err);
      }
      return [];
   }
}

// Helper function to run the actual migration
const performMigration = async migration => {
   console.log('performing', migration);
   return new Promise(async (resolve, reject) => {
      const migrationSql = require(`./files/${migration}`).default;
      if (migrationSql !== 'QUERY') {
         try {
            const result = await Db.query(migrationSql);

            // if the migration ran, insert it into the database
            const insertResult = await Db.query(`INSERT INTO migrations (migration_name) VALUES ('${migration}')`);

            console.log(`${migration} ran successfully.`);
            resolve();
         } catch (e) {
            console.log(`Error on migration ${migration}: `);
            console.log(e);
            reject(e);
         }
      } else {
         reject('Empty migration...skipping.');
      }
   });
}

const runAllMigrations = async (migrationsNotRun) => {
   for (const filename of migrationsNotRun) {
      try {
         await performMigration(filename);
      } catch (e) {
         console.log(e);
      }
   }
}

(async () => {
   const migrations = await getMigrationsToRun();
   await runAllMigrations(migrations);
   console.log('Done!');
})()

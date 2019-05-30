// NOTE: this needs to be written in es5 as simply running node from the command
//    line won't transpile to es6
// Possible fix: create a make file and run `babel-node createMigration ...` as make migrate
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
   console.log('Error: no filename supplied');
   throw new Error('Error: no filename supplied');
}


const d = new Date();
const filename = `files/${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}_${process.argv[2]}.js`;

console.log(`migrations/${filename}`);

fs.writeFileSync(path.join(__dirname, filename), 'export default `QUERY`;');

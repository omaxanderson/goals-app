import Db from '../database/db';

export const index = async () => {
   const sql = 'SELECT json FROM list_order';
   const result = await Db.fetchOne(sql);
   console.log(result.json);
   return JSON.stringify(JSON.parse(result.json));
}

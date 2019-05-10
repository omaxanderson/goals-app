import Db from '../database/db';

export const index = async () => {
   const sql = 'SELECT json FROM list_order';
   const result = await Db.fetchOne(sql);
   return {
      result: result.json,
   };
}

export const update = async (list) => {
   const sql = Db.format(`UPDATE list_order
      SET json = ?`, [JSON.stringify(list.list)]);
   const result = await Db.query(sql);
   return result;
}

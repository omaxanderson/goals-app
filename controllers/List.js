import Db from '../database/db';

export const index = async (f_goal_types = '') => {
   const sql = 'SELECT json FROM list_order';
   const result = await Db.fetchOne(sql);
   const goal_types = f_goal_types.split(',');
   return {
      result: f_goal_types
         ? JSON.parse(result.json).filter(type => goal_types.includes(type))
         : JSON.parse(result.json),
   };
};

export const update = async (list) => {
   const sql = Db.format(
      'UPDATE list_order SET json = ?',
      [JSON.stringify(list.list)]
   );
   const result = await Db.query(sql);
   return result;
};

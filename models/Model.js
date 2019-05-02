import QueryBuilder from '../database/QueryBuilder';

export default class Model {

   constructor() {
      this._query = new QueryBuilder();
   }

   addSelect = (sql) => {
      this._query.addSelect(sql);
   }

   addWhere = (sql) => {
      this._query.addWhere(sql);
   }

   from = (table) => {
      this._query.from(table);
   }

   addJoin = (sql) => {
      this._query.addJoin(sql);
   }

   execute = async () => {
      return await this._query.execute();
   }

   fetchOne = async () => {
      console.log(this._query._sql);
      const data = await this._query.execute();
      return data[0];
   }
}

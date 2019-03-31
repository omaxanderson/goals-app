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

	execute = async () => {
		return await this._query.execute();
	}
}

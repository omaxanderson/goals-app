import Db from './db';

class QueryBuilder {

	_table = null;
	_select = [];
	_joins = [];
	_where = [];
	_groupBy = [];
	_having = [];
	_order = [];
	_sql = null;

	from(table) {
		if (this._table) {
			throw { error: "Table has already been set" };
		}
		this._table = table;
	}

	addSelect(select) {
		this._select.push(select);
	}

	addJoin(join) {
		this._joins.push(join);
	}

	addWhere(where) {
		this._where.push(where);
	}

	addGroupBy(groupBy) {
		this._groupBy.push(groupBy);
	}

	addHaving(having) {
		this._having.push(having);
	}

	addOrder(order) {
		this._order.push(order);
	}

	// Used internally to build the sql statement
	_buildQuery() {
		if (!this._table || !this._select.length) {
			throw { error: "Table and select statements are required!" };
		}

		let sql = 'SELECT ';
		sql += this._select.join(', ');

		sql += ' FROM ';
		sql += this._table;

		sql += ' ';
		sql += this._joins.join(' ');

		sql += this._where.length ? ' WHERE ' : '';
		sql += this._where.map(clause => {
			if (clause.toLowerCase().includes(' or ')) {
				return `(${clause})`;
			} else {
				return clause;
			}
		}).join(' AND ');

		sql += this._groupBy.length ? ' GROUP BY ' : '';
		sql += this._groupBy.join(', ');

		sql += this._having.length ? ' HAVING ' : '';
		sql += this._having.map(clause => {
			if (clause.toLowerCase().includes(' or ')) {
				return `(${clause})`;
			} else {
				return clause;
			}
		}).join(' AND ');

		sql += this._order.length ? ' ORDER BY ' : '';
		sql += this._order.join(' AND ');

		this._sql = sql;

		console.log(sql);
			
	}

	async execute(params = {}) {
		this._buildQuery();

		const result = await Db.query(this._sql);
		return result;
	}

}

export default QueryBuilder;

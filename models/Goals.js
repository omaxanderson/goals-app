import Model from './Model';

// Lets get this to extend a base Model class
class Goals extends Model {
	constructor(params) {
		super(params);
		this._userId = 0;
		this._columns = [];
		this.from('goals');
	}

	set columns(columns) {
		this._columns = columns;
	}

	addColumn = (col) => {
		this._columns.push(col);
	}

	set userId(id) {
		this.addWhere(`user_id = ${id}`);
		this._userId = id;
	}

	async fetchAll() {
		if (this._columns.length) {
			for (const column of this._columns) {
				this.addSelect(column);
			}
		} else {
			this.addSelect('*');
		}

		const result = await this.execute();
		return result;
	}

}

export default Goals;

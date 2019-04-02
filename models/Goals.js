import Model from './Model';
import Db from '../database/db';

// Lets get this to extend a base Model class
class Goals extends Model {
	constructor(goalId = null) {
		super(goalId);

		// Set the instance variables
		this._columns = [];
		
		this._userId = 0;
		this._goalId = goalId;
		this._title = null;
		this._description = null;
		this._startDate = null;
		this._endDate = null;
		this._goalReached = false;

		this.from('goals');
	}

	loadById = async (id) => {
		this.addWhere(`goal_id = ${id}`);
		this.goalId = id;
		try {
			const data = await this.fetchOne();
			this._userId = data.user_id;
			this._title = data.title;
			this._description = data.description;
			this._startDate = data.start_date;
			this._endDate = data.end_date;
			this._goalReached = data.goal_reached;
		} catch (e) {
			console.log(e);
			throw e;
		}

	}

	save = async () => {
		if (this._goalId) {
			// update existing goal
			const sql = Db.format(`UPDATE goals
				SET user_id = ?,
					title = ?,
					description = ?,
					start_date = ?,
					end_date = ?,
					goal_reached = ?
				WHERE goal_id = ?`,
				[
					this._userId,
					this._title,
					this._description,
					this._startDate,
					this._endDate,
					this._goalReached,
					this._goalId
				]
			);
			try {
				const result = await Db.query(sql);
				if (result.changedRows) {
					return result;
				} else {
					throw { error: 'No rows affected' };
				}
			} catch (e) {
				console.log('throwing from model');
				throw e;
			}
		} else {
			// create new goal
			try {
				const result = await Db.insert('goals', {
					title: 			this._title,
					description: 	this._description,
					start_date: 	this._startDate,
					end_date: 		this._endDate,
					goal_reached: 	this._goalReached,
					user_id: 		1	// Hard coding this since not planning on adding other users yet
				});

				return { 
					result: 'success',
					goalId: result.insertId,
				}
			} catch (e) {
				throw e;
			}
		}
	}

	remove = async () => {
		try {
			const result = Db.query(Db.format(`DELETE from goals
				WHERE goal_id = ?`,
				[ this._goalId ]
			));
			return result;
		} catch (e) {
			throw e;
		}
	}

	// ============ 	Setters   ===============
	get title() { return this._title; }
	set goalId(id) {
		this._goalId = id;
		return this;
	}

	set title(title) {
		this._title = title;
		return this;
	}

	set description(description) {
		this._description = description;
		return this;
	}

	set endDate(endDate) {
		this._endDate = endDate;
		return this;
	}

	set startDate(startDate) {
		this._startDate = startDate;
		return this;
	}

	set goalReached(goalReached) {
		this._goalReached = goalReached;
		return this;
	}

	/* Sets the list of columns
	 *
	 * @columns Array
	 */
	set columns(columns) {
		this._columns = columns;
		return this;
	}

	/* Set the user id
	 *
	 * @param id Number
	 */
	set userId(id) {
		this.addWhere(`user_id = ${id}`);
		this._userId = id;
	}

	/* Add a column to the list of selected columns
	 *
	 * @param col String - must be a valid column from the database table
	 */
	addColumn = (col) => {
		this._columns.push(col);
	}

	/* Gets all goals based on pre-defined criteria
	 *
	 * @return array
	 */
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

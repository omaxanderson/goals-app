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
		this._isRecurring = null;
		this._scheduleType = null;
		this._weekdays = [];
		this._daily = null;
		this._weekly = null;
		this._monthly = null;
		this._yearly = null;
		this._goalReached = false;

		this.from('goals');
	}

	loadById = async (id) => {
		this.addJoin('JOIN goal_schedule USING (goal_id)');
		this.addWhere(`goal_id = ${id}`);
		this.goalId = id;
		try {
			const data = await this.fetchOne();
			this._userId = data.user_id;
			this._title = data.title;
			this._description = data.description;
			this._goalReached = data.goal_reached;
			this._startDate = data.start_date;
			this._endDate = data.end_date;
			this._isRecurring = data.is_recurring;
			this._daily = data.daily;
			this._weekly = data.weekly;
			this._monthly = data.monthly;
			this._yearly = data.yearly;
			console.log('from model', this._startDate, this._endDate);
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	save = async () => {
		if (this._goalId) {
			// update existing goal
			try {
				const goalUpdate = await Db.query(Db.format(`UPDATE goals
					SET user_id = ?,
						title = ?,
						description = ?,
						goal_reached = ?
					WHERE goal_id = ?`,
					[
						this._userId,
						this._title,
						this._description,
						this._goalReached,
						this._goalId
					]
				));

				const scheduleUpdate = await Db.query(Db.format(`UPDATE goal_schedule
					SET start_date = ?,
						end_date = ?,
						is_recurring = ?,
						daily = ?,
						weekly = ?,
						monthly = ?,
						yearly = ?
					WHERE goal_id = ?`,
					[
						this._startDate,
						this._endDate,
						this._isRecurring,
						this._daily,
						this._weekly,
						this._monthly,
						this._yearly,
						this._goalId,
					]
				));

				return {
					goalUpdate,
					scheduleUpdate,
				};
			} catch (e) {
				console.log('throwing from model');
				throw e;
			}
		} else {
			// create new goal
			try {
				const goalsInsert = await Db.insert('goals', {
					title: 			this._title,
					description: 	this._description,
					goal_reached: 	this._goalReached,
					start_date: 	this._startDate,
					user_id: 		1	// Hard coding this since not planning on adding other users yet
				});

				const weekdayList = this._weekdays && this._weekdays.split(',');
				const weekdays = this._scheduleType === 'weekdays' ? {
						sunday: Number(weekdayList.includes('SU')),
						monday: Number(weekdayList.includes('M')),
						tuesday: Number(weekdayList.includes('T')),
						wednesday: Number(weekdayList.includes('W')),
						thursday: Number(weekdayList.includes('TH')),
						friday: Number(weekdayList.includes('F')),
						saturday: Number(weekdayList.includes('S')),
					}
					: {};
				console.log(weekdays);

				const scheduleInsert = await Db.insert('goal_schedule', {
					goal_id: goalsInsert.insertId,
					end_date: this._endDate,
					schedule_type: this._scheduleType,
					...weekdays,
					custom_amount: this._amount,
					custom_amount_type: this._amountType,
					custom_per_type: this._perType,
				});

				return { 
					goalsInsert,
					scheduleInsert,
				}
			} catch (e) {
				console.log('whoops');
				console.log(e);
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

	set goalId(id) { this._goalId = id; }
	set title(title) { this._title = title; }
	set description(description) { this._description = description; }
	set endDate(endDate) { this._endDate = endDate; }
	set startDate(startDate) { this._startDate = startDate; }
	set goalReached(goalReached) { this._goalReached = goalReached; }
	set columns(columns) { this._columns = columns; }
	set userId(id) { this.addWhere(`user_id = ${id}`); }
	set scheduleType(type) { this._scheduleType = type; }
	set weekdays(weekdays) { this._weekdays = weekdays; }
	set amount(amount) { this._amount = amount; }
	set amountType(amountType) { this._amountType = amountType; }
	set perType(perType) { this._perType = perType; }


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

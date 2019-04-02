import QueryBuilder from '../database/QueryBuilder';
import Goals from '../models/Goals';

export const getAll = async (userId, params) => {
	const model = new Goals();
	model.userId = userId;

	if (params.columns && params.columns.length) {
		model.columns = params.columns;
	}

	try {
		const results = await model.fetchAll();
		return results;
	} catch (err) {
		console.log(err);
		throw { error: err };
	}
}

export const create = async (data) => {
	console.log(data);
	const goal = new Goals();
	goal.title = data.title;
	goal.description = data.description;
	goal.startDate = data.startDate;
	goal.endDate = data.endDate;
	goal.goalReached= data.goalReached;
	try {
		return await goal.save();
	} catch (e) {
		return e;
	}
}

export const update = async (goalId, data) => {
	const goal = new Goals();
	await goal.loadById(goalId);

	for (const column in data) {
		goal[column] = data[column];
	}

	try {
		return await goal.save();
	} catch (e) {
		console.log('catching and throwing from controller');
		throw e;
	}
}

export const remove = async (goalId) => {
	const goal = new Goals(goalId);
	const result = await goal.remove();
	return result;
}

import { all, call, put, takeEvery } from 'redux-saga/effects';

function* createGoal(action) {
	try {
		const result = yield fetch('/api/goals', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(action.payload),
		});
	} catch (e) {
		yield put({
			type: 'ERROR_CREATE_GOAL',
		});
	}
}

export default function* watchGoals() {
	console.log('from watchGoals');

	yield all([
		takeEvery('CREATE_GOAL', createGoal),
	]);
}

import { all, put, takeEvery } from 'redux-saga/effects';
import api from '../util/api';

function* createGoal(action) {
  try {
    yield put({ type: 'GOALS_TEST', loading: true });

    const result = yield fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    const resStatus = result.status;
    const json = yield result.json();
    console.log(json);

    if (resStatus !== 200) {
      yield put({
        type: 'ERROR_GOAL_CREATE',
        payload: {
          error: json.error,
        },
      });
    } else {
      yield put({
        type: 'SUCCESS_GOAL_CREATE',
        payload: json,
      });
    }
  } catch (e) {
    yield put({
      type: 'ERROR_GOAL_CREATE',
      payload: {
        error: 'just cuz',
      },
    });
  }
}

function* dailyGoalReviewed(action) {
  try {
    const result = yield api.post(`/review/${action.payload.goal_id}`, {
      goal_id: action.payload.goal_id,
      completed: action.payload.completed,
    });
    yield put({
      type: 'SUCCESS_DAILY_GOAL_REVIEWED',
    });
    return result;
  } catch (e) {
    yield put({
      type: 'ERROR_DAILY_GOAL_REVIEWED',
    });
  }
}

function* weeklyGoalReviewed(action) {
  try {
    const result = yield api.post(`/review/${action.payload.goal_id}`, {
      goal_id: action.payload.goal_id,
      completed: action.payload.completed,
    });
    yield put({
      type: 'SUCCESS_WEEKLY_GOAL_REVIEWED',
    });
    return result;
  } catch (e) {
    yield put({
      type: 'ERROR_WEEKLY_GOAL_REVIEWED',
    });
  }
}

function* weekdaysGoalReviewed(action) {
  try {
    const result = yield api.post(`/review/${action.payload.goal_id}`, {
      goal_id: action.payload.goal_id,
      completed: action.payload.completed,
    });
    yield put({
      type: 'SUCCESS_WEEKDAYS_GOAL_REVIEWED',
    });
    return result;
  } catch (e) {
    yield put({
      type: 'ERROR_WEEKDAYS_GOAL_REVIEWED',
    });
  }
}

function* endDateGoalReviewed(action) {
  try {
    const result = yield api.post(`/review/${action.payload.goal_id}`, {
      goal_id: action.payload.goal_id,
      completed: action.payload.completed,
    });
    yield put({
      type: 'SUCCESS_END_DATE_GOAL_REVIEWED',
    });
    return result;
  } catch (e) {
    yield put({
      type: 'ERROR_END_DATE_GOAL_REVIEWED',
    });
  }
}

function* customGoalReviewed(action) {
  try {
    const result = yield api.post(`/review/${action.payload.goal_id}`, {
      goal_id: action.payload.goal_id,
      completed: action.payload.amount,
    });
    yield put({
      type: 'SUCCESS_CUSTOM_GOAL_REVIEWED',
    });
    return result;
  } catch (e) {
    yield put({
      type: 'ERROR_CUSTOM_GOAL_REVIEWED',
    });
  }
}

function* goalListSort(action) {
  const result = yield api.put('/list', {
    list: action.payload,
  });
  console.log(result);
  return 'nice';
}

function* getGoals(action) {
  const result = yield api.get('/goals', { params: action.params });
  yield put({
    type: 'GOALS_LOADED',
    payload: result,
  });
}

export default function* watchGoals() {
  yield all([
    takeEvery('CREATE_GOAL', createGoal),
    takeEvery('DAILY_GOAL_REVIEWED', dailyGoalReviewed),
    takeEvery('WEEKLY_GOAL_REVIEWED', weeklyGoalReviewed),
    takeEvery('WEEKDAYS_GOAL_REVIEWED', weekdaysGoalReviewed),
    takeEvery('END_DATE_GOAL_REVIEWED', endDateGoalReviewed),
    takeEvery('CUSTOM_GOAL_REVIEWED', customGoalReviewed),
    takeEvery('GOAL_LIST_SORT', goalListSort),
    takeEvery('FETCH_GOALS', getGoals),
  ]);
}

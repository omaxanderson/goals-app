import { all, put, takeEvery } from 'redux-saga/effects';

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

      const json = yield result.json();

      yield put({
         type: 'SUCCESS_GOAL_CREATE',
         payload: json,
      });

      // maybe redirect to the goal listing page?
   } catch (e) {
      yield put({
         type: 'ERROR_CREATE_GOAL',
      });
   }
}

const api = {
   post: async (path, body) => {
      try {
         const result = await fetch(`/api${path}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: typeof body === 'string'
               ? body
               : JSON.stringify(body),
         });
         const data = await result.json();
         return data;
      } catch (e) {
         console.log('Error:', e);
         return e;
      }
   }
};

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
         amount: action.payload.amount,
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

export default function* watchGoals() {
   console.log('from watchGoals');

   yield all([
      takeEvery('CREATE_GOAL', createGoal),
      takeEvery('DAILY_GOAL_REVIEWED', dailyGoalReviewed),
      takeEvery('WEEKLY_GOAL_REVIEWED', weeklyGoalReviewed),
      takeEvery('WEEKDAYS_GOAL_REVIEWED', weekdaysGoalReviewed),
      takeEvery('END_DATE_GOAL_REVIEWED', endDateGoalReviewed),
      takeEvery('CUSTOM_GOAL_REVIEWED', customGoalReviewed),
   ]);
}

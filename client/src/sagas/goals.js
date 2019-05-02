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

export default function* watchGoals() {
   console.log('from watchGoals');

   yield all([
      takeEvery('CREATE_GOAL', createGoal),
   ]);
}

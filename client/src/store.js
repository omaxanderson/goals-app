import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import goals from './sagas/goals';

import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
	rootReducer,
	compose(
		applyMiddleware(sagaMiddleware),
		composeWithDevTools(),
	),
);

// Run saga middleware here
sagaMiddleware.run(goals);

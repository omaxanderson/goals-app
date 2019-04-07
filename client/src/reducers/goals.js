export default function(state = {}, action) {
	switch (action.type) {
		case 'GOALS_TEST':
			console.log('from goals test reducer');
			console.log(action.payload);
			return state;
		default:
			return state;
	}
}

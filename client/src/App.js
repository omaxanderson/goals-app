import React from 'react';

class App extends React.Component {
	post() {
		fetch('/api/goals', {
			method: 'POST',
			body: JSON.stringify({
				title: 'testing',
				description: 'test description',
				startDate: '2019-04-01',
				endDate: '2019-05-01',
				isNumber: 1,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json)
			.then(data => {
				console.log(data);
			});
			
	}
	render() {
		return (
			<React.Fragment>
				<h1>App</h1>
				<button onClick={this.post}>Post</button>
			</React.Fragment>
		)
	}
}

export default App;

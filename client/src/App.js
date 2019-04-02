import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
		}
	}

	post() {
		fetch('/api/goals', {
			method: 'POST',
			body: JSON.stringify({
				title: 'testing',
				description: 'test description',
				startDate: '2019-04-01',
				endDate: '2019-05-01',
				isRecurring: 1,
				daily: 0,
				weekly: 3,
				monthly: 12,
				yearly: 1,
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
	put = (id) => {
		fetch('/api/goals/' + this.state.id, {
			method: 'PUT',
			body: JSON.stringify({
				title: 'title update',
				endDate: '2019-05-02',
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

	delete = () => {
		fetch('/api/goals/' + this.state.id, {
			method: 'DELETE',
		})
			.then(res => res.json)
			.then(data => {
				console.log(data);
			});
	}

	updateId = (e) => {
		this.setState({id: document.querySelector('#idField').value });
	}

	render() {
		return (
			<React.Fragment>
				<h1>App</h1>
				<button onClick={this.post}>Post</button><br />
				<button onClick={this.delete}>Delete</button><br />
				<button onClick={() => this.put()}>Put</button><br />
				<input onChange={() => this.updateId()} type='text' id='idField' /><br />
			</React.Fragment>
		)
	}
}

export default App;

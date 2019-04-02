import React from 'react';

class Goals extends React.Component {
	render() {
		return (
			<div className='row'>
				<div className='col s12'>
					<ul className='tabs'>
						<li className='tab col s4'><a href='#createGoal'>Create</a></li>
						<li className='tab col s4'><a href='#goals'>Goals</a></li>
					</ul>
				</div>
				<div id='createGoal'>Goal Create</div>
				<div id='goals'>Goals</div>
			</div>
		);
	}
}

export default Goals;

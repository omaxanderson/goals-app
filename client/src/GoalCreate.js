import React from 'react';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Row from './components/Row';
import DatePicker from './components/DatePicker';
import Collapsible, { CollapsibleHeader, CollapsibleBody } from './components/Collapsible';
import WeekdaySelector from './components/WeekdaySelector';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class GoalCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			goalTitle: '',
			goalDescription: '',
			endDateOpen: false,
			weekdays: [
				{ label: 'SU', selected: false },
				{ label: 'M', selected: false },
				{ label: 'T', selected: false },
				{ label: 'W', selected: false },
				{ label: 'TH', selected: false },
				{ label: 'F', selected: false },
				{ label: 'S', selected: false },
			],
		}
	}

	componentDidMount() {
		M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
	}

	render() {
		const curDate = new Date('2019-06-03');
		return (
			<div className='container'>
				<h4>Goal Create form</h4>
				<div className='row'>
					<form className='col s12'>
						<Row>
							<TextField 
								label='Title'
								size='col s6'
								onChange={ (e) => this.setState({ goalTitle: e.target.value}) }
							/>
							<DatePicker 
								size='col s3'
								label='Start Date'
							/>
							<DatePicker 
								size='col s3'
								label='End Date'
							/>
						</Row>
						<Row>
							<TextArea 
								label='Description'
								size='col s12'
								onChange={ (e) => this.setState({ goalDescription: e.target.value}) }
							/>
						</Row>
					</form>
					<Row>
						{ /* What's the best way to handle this? Should the state be handled here? */ }
						<WeekdaySelector 
							onChange={(weekdays) => {
								this.setState({ weekdays });
							}}
						/>
					</Row>
				</div>
			</div>
		);
	}

}

export default GoalCreate;

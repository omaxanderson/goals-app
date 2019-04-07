import React from 'react';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Row from './components/Row';
import DatePicker from './components/DatePicker';
import Collapsible, { CollapsibleHeader, CollapsibleBody } from './components/Collapsible';
import WeekdaySelector from './components/WeekdaySelector';
import ScheduleSelector from './components/ScheduleSelector';
import CustomScheduler from './components/CustomScheduler';
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
			scheduleType: 'weekdays',
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
					{ /* this is kind of wonky... */ }
					<div style={ ['weekdays', 'custom'].includes(this.state.scheduleType) ? { marginBottom: '0px' } : {}} className='row'>
						<div style={ ['weekdays', 'custom'].includes(this.state.scheduleType) ? { marginBottom: '0px' } : {}}>
							<ScheduleSelector 
								defaultChecked='weekdays'
								onChange={ (e) => this.setState({ scheduleType: e }) }
							/>
						</div>
					</div>
					<Row>
						{ this.state.scheduleType === 'weekdays' &&
							<WeekdaySelector 
								onChange={(weekdays) => {
									this.setState({ weekdays });
								}}
							/>
						}
						{ this.state.scheduleType === 'custom' &&
							<CustomScheduler 
								onChange={ (e) => {
									console.log(e.target.dataset.type);
									console.log(e.target.value);
								}}
							/>
						}
					</Row>
				</div>
			</div>
		);
	}

}

export default GoalCreate;

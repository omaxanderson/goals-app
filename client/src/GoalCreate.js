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
			customSchedule: {
				amount: 0,
				amountType: 'minutes',
				perType: 'days',
			}
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
								size='col s9'
								onChange={ (e) => this.setState({ goalTitle: e.target.value}) }
							/>
							<DatePicker 
								size='col s3'
								label='Start Date'
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
					<div style={ this.state.scheduleType === 'custom' ? { marginBottom: '0px' } : {}} className='row'>
						<div style={ this.state.scheduleType === 'custom' ? { marginBottom: '0px' } : {}}>
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
								onChange={ (e) => this.onCustomScheduleChange(e) }
							/>
						}
						{ this.state.scheduleType === 'endDate' &&
							<DatePicker 
								size='col s4'
								label='End Date'
							/>
						}
					</Row>
					<Row>
						<form>
							<button onClick={ this.onSubmit } className='btn waves-effect waves-light' type='submit'>
								Submit
								<i className='material-icons right'>send</i>
							</button>
						</form>
					</Row>
				</div>
			</div>
		);
	}

	onCustomScheduleChange = (e) => {
		const customSchedule = Object.assign(this.state.customSchedule);
		switch (e.target.dataset.type) {
			case 'text':
				customSchedule.amount = e.target.value;
				break;
			case 'amountType':
				customSchedule.amountType = e.target.value;
				break;
			case 'perType':
				customSchedule.perType = e.target.value;
				break;
		}
		this.setState({ customSchedule });
	}

	onSubmit = (e) => {
		console.log('submitting');
		e.preventDefault();
	}

}

export default GoalCreate;

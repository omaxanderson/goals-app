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
					<Row>
						{ /* What's the best way to handle this? Should the state be handled here? */ }
						<WeekdaySelector 
							onChange={(weekdays) => {
								this.setState({ weekdays });
							}}
						/>
					</Row>
					<Row>
						<form onChange={e => console.log(e) } >
							<p>
								<label htmlFor='radio-weekdays'>
									<input id='radio-weekdays' 
										name='scheduleOption' 
										type='radio' 
										defaultChecked={ this.state.scheduleType === 'weekdays' }
										onChange={() => this.setState({ scheduleType: 'weekdays' }) }
									/>
									<span>Weekdays</span>
								</label>
							</p>
							<p>
								<label htmlFor='radio-custom'>
									<input 
										id='radio-custom' 
										name='scheduleOption' 
										type='radio' 
										defaultChecked={ this.state.scheduleType === 'custom' }
										onChange={() => this.setState({ scheduleType: 'custom' }) }
									/>
									<span>Custom</span>
								</label>
							</p>
							<p>
								<label htmlFor='radio-daily'>
									<input 
										id='radio-daily' 
										name='scheduleOption' 
										type='radio' 
										defaultChecked={ this.state.scheduleType === 'daily' }
										onChange={() => this.setState({ scheduleType: 'daily' }) }
									/>
									<span>Daily</span>
								</label>
							</p>
							<p>
								<label htmlFor='radio-weekly'>
									<input 
										id='radio-weekly' 
										name='scheduleOption' 
										type='radio' 
										defaultChecked={ this.state.scheduleType === 'weekly' }
										onChange={() => this.setState({ scheduleType: 'weekly' }) }
									/>
									<span>Weekly</span>
								</label>
							</p>
						</form>
					</Row>
				</div>
			</div>
		);
	}

}

export default GoalCreate;

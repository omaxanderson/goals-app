import React from 'react';

export default class ScheduleSelector extends React.Component {

	render() {
		return (
			<form onChange={e => console.log(e) } >
				<p>
					<label htmlFor='radio-end-date'>
						<input id='radio-end-date' 
							name='scheduleOption' 
							type='radio' 
							defaultChecked={ this.props.defaultChecked === 'endDate' }
							onChange={() => this.props.onChange('endDate') }
						/>
						<span>End Date</span>
					</label>
				</p>
				<p>
					<label htmlFor='radio-weekdays'>
						<input id='radio-weekdays' 
							name='scheduleOption' 
							type='radio' 
							defaultChecked={ this.props.defaultChecked === 'weekdays' }
							onChange={() => this.props.onChange('weekdays') }
						/>
						<span>Weekdays</span>
					</label>
				</p>
				<p>
					<label htmlFor='radio-daily'>
						<input 
							id='radio-daily' 
							name='scheduleOption' 
							type='radio' 
							defaultChecked={ this.props.defaultChecked === 'daily' }
							onChange={() => this.props.onChange('daily') }
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
							defaultChecked={ this.props.defaultChecked === 'weekly' }
							onChange={() => this.props.onChange('weekly') }
						/>
						<span>Weekly</span>
					</label>
				</p>
				<p>
					<label htmlFor='radio-custom'>
						<input 
							id='radio-custom' 
							name='scheduleOption' 
							type='radio' 
							defaultChecked={ this.props.defaultChecked === 'custom' }
							onChange={() => this.props.onChange('custom') }
						/>
						<span>Custom</span>
					</label>
				</p>
			</form>

		);
	}
}

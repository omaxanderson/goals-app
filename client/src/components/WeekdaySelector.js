import React from 'react';

export default class WeekdaySelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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

	handleClick(e) {
		const state = this.state.weekdays.map(day => {
			if (day.label === e.target.dataset.value) {
				return { label: day.label, selected: !day.selected };
			}
			return day;
		});
		this.setState({ weekdays: state });
		if (this.props.onChange) {
			this.props.onChange(state);
		}
	}

	render() {
		const body = this.state.weekdays.map(day => {
			return (
				<a 
					style={{marginRight: '1em'}} 
					key={ `${day.label}-button` }
					className={`btn-floating btn-large waves-effect day-of-week-button ${day.selected ? '' : 'grey'}`}
					data-value={day.label}
					onClick={ (e) => this.handleClick(e) }
				>{day.label}</a>
			);
		});
		return body;
	}
}

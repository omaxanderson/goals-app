import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

/* Materialize DatePicker component 
 *
 * reference: https://materializecss.com/pickers.html
 */ 
export default class DatePicker extends React.Component {
	componentDidMount() {
		// As a note for now, settings on one DatePicker will adjust settings on all other pickers
		// 	That's a problem for another day though...
		M.Datepicker.init(document.querySelectorAll('.datepicker'), {...this.props});
	}

	render() {
		return(
			<div className={`input-field ${this.props.size}`}>
				<input type='text' className='datepicker' id={this.props.label} />
				<label htmlFor={this.props.label}>{this.props.label}</label>
			</div>
		);
	}
}

DatePicker.defaultProps = {
	size: 'col s12',
}

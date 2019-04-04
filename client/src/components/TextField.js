import React from 'react';

export default class TextField extends React.Component {
	render() {
		return(
			<div className={ `input-field ${this.props.size}` }>
				<input onChange={this.props.onChange} id={this.props.label} type='text' />
				<label htmlFor={this.props.label}>{this.props.label}</label>
			</div>
		);
	}
}

TextField.defaultProps = {
	size: '',
};

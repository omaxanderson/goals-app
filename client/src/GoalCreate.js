import React from 'react';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Row from './components/Row';
import DatePicker from './components/DatePicker';
import Collapsible, { CollapsibleHeader, CollapsibleBody } from './components/Collapsible';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class GoalCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			goalTitle: '',
			goalDescription: '',
			endDateOpen: false,
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
						<a style={{marginRight: '1em'}} className='btn-floating btn-large waves-effect day-of-week-button'>Su</a>
						<a style={{marginRight: '1em'}} className='btn-floating btn-large waves-effect day-of-week-button'>M</a>
						<a style={{marginRight: '1em'}} className='btn-floating btn-large waves-effect day-of-week-button'>T</a>
						<a style={{marginRight: '1em'}} className='btn-floating btn-large waves-effect day-of-week-button'>W</a>
						<a style={{marginRight: '1em'}} className='btn-floating btn-large waves-effect day-of-week-button'>Th</a>
						<a style={{marginRight: '1em'}} className='btn-floating btn-large waves-effect day-of-week-button'>F</a>
						<a style={{marginRight: '1em'}} className='btn-floating btn-large waves-effect day-of-week-button'>S</a>
					</Row>
				</div>
			</div>
		);
	}

}

export default GoalCreate;

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
						</Row>
						<Row>
							<TextArea 
								label='Description'
								size='col s12'
								onChange={ (e) => this.setState({ goalDescription: e.target.value}) }
							/>
						</Row>
						<Row>
							<div className='date-picker-collapsible'>
								<Collapsible size='col s6' id='endDateCollapse'>
									<li>
										<CollapsibleHeader>
											<label>
												<input onClick={() => {
													M.Collapsible.getInstance(document.querySelector('#endDateCollapse')).open(0);
												}} type='checkbox' /><span>Set End Date</span>
											</label>
										</CollapsibleHeader>
										<CollapsibleBody>
											<DatePicker 
												size='col s3' 
												label='End Date' 
												size=''
											/>
										</CollapsibleBody>
									</li>
								</Collapsible>
							</div>
						</Row>
					</form>
				</div>
			</div>
		);
	}

}

export default GoalCreate;

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import get from 'lodash/get';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Row from './components/Row';
import DatePicker from './components/DatePicker';
import WeekdaySelector from './components/WeekdaySelector';
import ScheduleSelector from './components/ScheduleSelector';
import CustomScheduler from './components/CustomScheduler';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class GoalCreate extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         goalTitle: '',
         goalDescription: '',
         startDate: moment().format('YYYY-MM-DD'),
         endDate: null,
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
            amountType: '1',
            perType: '3',
         },
      };
   }

   componentDidMount() {
      M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
   }

   render() {
      if (this.props.redirect) {
         window.location.href = '/';
      }
      return (
         <React.Fragment>
            <Navbar />
            <div className="container">
               {
                  this.props.loading
                  && <Loader />
               }
               <h4>Goal Create form</h4>
               <div className="row">
                  <form className="col s12">
                     <Row>
                        <TextField
                          label="Title"
                           size="col s9"
                           onChange={e => this.setState({ goalTitle: e.target.value })}
                        />
                        <DatePicker
                          size="col s3"
                          label="Start Date"
                           onChange={date => this.setState({
                              startDate: moment(date).format('YYYY-MM-DD'),
                           })}
                        />
                     </Row>
                     <Row>
                        <TextArea
                           label="Description"
                          size="col s12"
                          onChange={e => this.setState({ goalDescription: e.target.value })}
                        />
                     </Row>
                  </form>
                  { /* this is kind of wonky... */ }
                  <div style={this.state.scheduleType === 'custom' ? { marginBottom: '0px' } : {}} className="row">
                     <div style={this.state.scheduleType === 'custom' ? { marginBottom: '0px' } : {}}>
                        <ScheduleSelector
                          defaultChecked="weekdays"
                          onChange={e => this.setState({ scheduleType: e })}
                        />
                     </div>
                  </div>
                  <Row>
                     { this.state.scheduleType === 'weekdays'
                     && (
                        <WeekdaySelector
                           onChange={(weekdays) => {
                              this.setState({ weekdays });
                           }}
                        />
                     )
                     }
                     { this.state.scheduleType === 'custom'
                        && (
                           <CustomScheduler
                             onChange={e => this.onCustomScheduleChange(e)}
                           />
                        )
                     }
                     { this.state.scheduleType === 'endDate'
                        && (
                           <DatePicker
                             size="col s4"
                             label="End Date"
                             onChange={date => this.setState({ endDate: moment(date).format('YYYY-MM-DD') })}
                              id="end-date-picker"
                           />
                        )
                     }
                  </Row>
                  <Row>
                     <form>
                        <button onClick={this.onSubmit} className="btn waves-effect waves-light" type="submit">
                        Submit
                           <i className="material-icons right">send</i>
                        </button>
                     </form>
                  </Row>
                  {this.props.error
                  && (
                     <Row>
                        <p className="red-text">{this.props.error}</p>
                     </Row>
                  )
                  }
               </div>
            </div>
         </React.Fragment>
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
      default:
      }
      /*
      this.props.dispatch({

      });
      */
      this.setState({ customSchedule });
   }

   onSubmit = (e) => {
      const goal = {
         title: this.state.goalTitle,
         startDate: this.state.startDate,
         description: this.state.goalDescription,
         scheduleType: this.state.scheduleType,
      };
      if (goal.scheduleType === 'endDate') {
         goal.endDate = this.state.endDate;
      } else if (goal.scheduleType === 'weekdays') {
         goal.weekdays = this.state.weekdays
            .filter(day => day.selected)
            .map(day => day.label)
            .join(',');
      } else if (goal.scheduleType === 'daily') {
         goal.daily = true;
      } else if (goal.scheduleType === 'weekly') {
         goal.weekly = true;
      } else if (goal.scheduleType === 'custom') {
         goal.customSchedule = this.state.customSchedule;
      }

      this.props.dispatch({
         type: 'CREATE_GOAL',
         payload: goal,
      });

      console.log('submitting');
      console.log(goal);
      e.preventDefault();
   }
}

export default connect(state => ({
   loading: get(state, 'goals.loading', false),
   redirect: get(state, 'goals.redirect', false),
   error: get(state, 'goals.error', false),
}))(GoalCreate);

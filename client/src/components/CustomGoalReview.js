import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
// import Checkbox from './Checkbox';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class CustomGoalReview extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         goal_id: this.props.goal_id,
         completed: this.props.completed || false,
         value: this.props.goal.completed.length ? this.props.goal.completed[0].amount : 0,
      };
   }

   componentDidMount() {
      M.FormSelect.init(document.querySelectorAll('select'), {

      });
   }

   handleChange = (e) => {
      console.log('WHATUPPPP');
      this.setState({ value: e.target.value });
      this.props.dispatch({
         type: 'CUSTOM_GOAL_REVIEWED',
         payload: {
            goal_id: this.props.goal.goal_id,
            amount: Number(e.target.value),
         },
      });
   }

   // we're going to say weeks start on monday and end on sunday
   // actually we could just use momentjs .week() function
   getGoalReachedThisWeek = () => {
      if (this.props.goal.goal_id === 1) {
         console.log(moment().week());
      }
      const week = this.props.goal.completed.filter(completed =>
      // check week and year and return match
         completed.week === moment().week()
            && completed.year === moment().year());
      if (this.props.goal.goal_id === 1) {
         console.log(week);
      }
      return week.length && week[0].amount;
   }

   getLabel = () => {
      const {
         custom_amount,
         custom_amount_type,
         custom_per_type,
      } = this.props.goal;
      const per_type_description = custom_per_type === 'month' ? 'this month'
         : (custom_per_type === 'week' ? 'this week' : 'today');

      return `How many ${custom_amount_type}s have you \
         ${['minute', 'hour', 'day'].includes(custom_amount_type) ? 'done' : 'completed the goal'} \
         ${per_type_description}? (Goal: ${custom_amount})`;
   }

   // @TODO this isn't re-rendering on select update
   render() {
      const id = `custom_goal_${this.props.goal.goal_id}_review`;
      const goalReached = this.getGoalReachedThisWeek();
      return (
         <div className="row">
            <div className="col s12 m9">
               <p>{this.props.goal.title}</p>
               <div className="input-field">
                  <select
                     defaultValue={goalReached}
                     onChange={this.handleChange}
                  >
                     {[...Array(this.props.goal.custom_amount + 1).keys()].map(num => (
                        <option key={`${id}_${num}`} value={num}>{num}</option>
                     ))}
                  </select>
                  <label htmlFor={id}>{this.getLabel()}</label>
               </div>
            </div>
         </div>
      );
   }
}

export default connect(state => ({

}))(CustomGoalReview);

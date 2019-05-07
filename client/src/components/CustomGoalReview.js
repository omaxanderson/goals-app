import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
//import Checkbox from './Checkbox';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class CustomGoalReview extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         goal_id: this.props.goal_id,
         completed: this.props.completed || false,
         value: this.props.goal.amountCompleted || '',
      };
   }

   componentDidMount() {
      M.FormSelect.init(document.querySelectorAll('select'), {

      });
   }

   handleChange = checked => {
      this.setState({completed: checked});
      this.props.dispatch({
         type: `WEEKLY_GOAL_REVIEWED`,
         payload: {
            goal_id: this.props.goal.goal_id,
            completed: checked,
         },
      });
   }

   // we're going to say weeks start on monday and end on sunday
   // actually we could just use momentjs .week() function
   getGoalReachedThisWeek = () => {
      console.log(moment().week());
      const week = this.props.goal.completed.filter(completed => {
         // check week and year and return match
         return completed.week_number === moment().week()
            && completed.year === moment().year();
         /*
         return moment(completed.date, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD');
            */
      });
      return week.length && week[0].completed;
   }

   getLabel = () => {
      const {
         custom_amount,
         custom_amount_type,
         custom_per_type
      } = this.props.goal;
      const per_type_description = custom_per_type == 'month' ? 'this month'
         : (custom_per_type == 'week' ? 'this week' : 'today');

      return `How many ${custom_amount_type}s have you \
         ${['minute', 'hour', 'day'].includes(custom_amount_type) ? 'done' : 'completed the goal'} \
         ${per_type_description}? (Goal: ${custom_amount})`;
   }

   test = (e) => {
      const { value } = e.target;
      console.log(value, this.props.goal.custom_amount);
      if (value <= this.props.goal.custom_amount) {
         this.setState({ value })
      }
   }

   render() {
      const id = `custom_goal_${this.props.goal.goal_id}_review`;
      return (
         <div className='row'>
            <div className='col s12 m9'>
               <p>{this.props.goal.title}</p>
               <div className='input-field'>
                  <select defaultValue={this.props.goal.completed.amount}>
                     {[...Array(this.props.goal.custom_amount).keys()].map(num => <option value={num}>{num}</option>)}
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

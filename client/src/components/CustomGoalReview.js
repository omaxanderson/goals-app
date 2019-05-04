import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';

class WeeklyGoalReview extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         goal_id: this.props.goal_id,
         completed: this.props.completed || false,
      };
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

   render() {
               { /* @TODO this shouldn't be goal_reached, 
                     but back end isn't sending correct data yet */ }
      return (
         <div>
            <p>{this.props.goal.title}</p>
            <Checkbox
               onChange={(a) => this.handleChange(a.target.checked)}
               checked={this.getGoalReachedThisWeek()}
               label='Did you complete this goal this week?'
            />
         </div>
      );
   }
}

export default connect(state => ({

}))(WeeklyGoalReview);

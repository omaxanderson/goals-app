import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';

class DailyGoalReview extends React.Component {
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
         type: `DAILY_GOAL_REVIEWED`,
         payload: {
            goal_id: this.props.goal.goal_id,
            completed: checked,
         },
      });
   }

   getGoalReachedToday = () => {
      const today = this.props.goal.completed.filter(completed => {
         return moment(completed.date, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD');
      });
      return today[0] ? today[0].completed : 0;
   }

   render() {
      return (
         <div>
            <p>{this.props.goal.title}</p>
            <Checkbox
               onChange={(a) => this.handleChange(a.target.checked)}
               checked={this.getGoalReachedToday()}
               label='Did you complete this goal today?'
            />
         </div>
      );
   }
}

export default connect(state => ({

}))(DailyGoalReview);

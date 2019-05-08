import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';

class WeekdaysGoalReview extends React.Component {
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

   getIsGoalActiveToday = () => {
      const { goal } = this.props;
      // would be a lot better if this came to us as a list of day numbers...
      // possibly corresponding to the moment day values
      console.log(moment().day());
      switch (moment().day()) {
         case 1:
            return goal.monday;
         case 2:
            return goal.tuesday;
         case 3:
            return goal.wednesday;
         case 4:
            return goal.thursday;
         case 5:
            return goal.friday;
         case 6:
            return goal.saturday;
         case 7:
            return goal.sunday;
         default:
      }
   }

   getGoalReachedToday = () => {
      const today = this.props.goal.completed.filter(completed => {
         return moment(completed.date, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD');
      });
      return today[0] ? today[0].completed : 0;
   }

   render() {
      const isActive = Boolean(this.getIsGoalActiveToday());
      return (
         <div>
            <p>{this.props.goal.title}</p>
            { isActive ? (
               <Checkbox
                  onChange={(a) => this.handleChange(a.target.checked)}
                  checked={this.getGoalReachedToday()}
                  label='Did you complete this goal today?'
               />
            ) : (
               <p>You dont even have to worry about this shit today!</p>
            )}
         </div>
      );
   }
}

export default connect(state => ({

}))(WeekdaysGoalReview);

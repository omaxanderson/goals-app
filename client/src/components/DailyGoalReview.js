import React from 'react';
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

   render() {
               { /* @TODO this shouldn't be goal_reached, 
                     but back end isn't sending correct data yet */ }
      return (
         <div>
            <p>{this.props.goal.title}</p>
            <Checkbox
               onChange={(a) => this.handleChange(a.target.checked)}
               checked={this.props.goal.goal_reached}
               label='Did you complete this goal today?'
            />
         </div>
      );
   }
}

export default connect(state => ({

}))(DailyGoalReview);

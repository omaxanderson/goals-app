import React from 'react';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';

class EndDateGoalReview extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         goal_id: this.props.goal_id,
         completed: this.props.completed || false,
      };
   }

   handleChange = (checked) => {
      this.setState({ completed: checked });
      this.props.dispatch({
         type: 'END_DATE_GOAL_REVIEWED',
         payload: {
            goal_id: this.props.goal.goal_id,
            completed: checked,
         },
      });
   }

   getGoalReached = () => this.props.goal.goal_reached;

   render() {
      return (
         <div>
            <p>{this.props.goal.title}</p>
            <Checkbox
              onChange={a => this.handleChange(a.target.checked)}
              checked={this.getGoalReached()}
              label="Did you complete this goal?"
            />
         </div>
      );
   }
}

export default connect(state => ({

}))(EndDateGoalReview);

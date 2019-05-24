import React from 'react';
import Chart from './components/Chart2.js';
import { connect } from 'react-redux';
import get from 'lodash/get';

class CustomGoalChart extends React.Component {

   async componentDidMount() {
      this.props.dispatch({
         type: 'FETCH_GOALS',
      });
   }

   render() {
      const { goals } = this.props;
      const weeklyGoals = goals.filter(goal => goal.custom_per_type === 'week');
      const monthlyGoals = goals.filter(goal => goal.custom_per_type === 'month');
      const dailyGoals = goals.filter(goal => goal.custom_per_type === 'day');
      return (
         <div>
            <Chart
               weekly={weeklyGoals}
               monthly={monthlyGoals}
               daily={dailyGoals}
            />
         </div>
      );
   }
}

export default connect(state => ({
   goals: get(state, 'goals.goals', []).filter(goal => goal.schedule_type === 'custom'),
}))(CustomGoalChart);

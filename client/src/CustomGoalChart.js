import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Chart from './components/Chart';
import Navbar from './components/Navbar';

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
         <React.Fragment>
            <Navbar />
            <div className="container">
               <Chart
                 weekly={weeklyGoals}
                 monthly={monthlyGoals}
                 daily={dailyGoals}
               />
            </div>
         </React.Fragment>
      );
   }
}

export default connect(state => ({
   goals: get(state, 'goals.goals', []).filter(goal => goal.schedule_type === 'custom'),
}))(CustomGoalChart);

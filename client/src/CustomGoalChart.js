import React from 'react';
import Chart from './components/Chart.js';
import { connect } from 'react-redux';
import get from 'lodash/get';

class CustomGoalChart extends React.Component {
   constructor(props) {
      super(props);
   }

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
      const weeklyData = weeklyGoals.map(goal => {
         return goal.completed.map(c => ({
            x: c.week,
            y: c.amount,
         }));
      });
      console.log(weeklyData);
      // need to get the data into the right format
      // @TODO update this to use chartjs instead of canvasjs
      return (
         <div>
            <Chart weeklyData={weeklyData} />
         </div>
      );
   }
}

export default connect(state => ({
   goals: get(state, 'goals.goals', []).filter(goal => goal.schedule_type === 'custom'),
}))(CustomGoalChart);

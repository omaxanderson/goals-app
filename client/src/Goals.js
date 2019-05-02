import React from 'react';
import GoalCreate from './GoalCreate';
import { connect } from 'react-redux';
import shortid from 'shortid';

class Goals extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         goals: [],
      };
   }
   async componentDidMount() {
      const result = await fetch('/api/goals');
      const data = await result.json();
      this.setState({ goals: data.results });
      console.log(data);

   }

   getWeeklyGoals = () => {
      return this.state.goals.filter(goal => goal.schedule_type === 'weekly');
   }

   getWeekdaysGoals = () => {
      return this.state.goals.filter(goal => goal.schedule_type === 'weekdays');
   }

   getEndDateGoals = () => {
      return this.state.goals.filter(goal => goal.schedule_type === 'endDate');
   }

   getDailyGoals = () => {
      return this.state.goals.filter(goal => goal.schedule_type === 'daily');
   }

   getCustomScheduleGoals = () => {
      return this.state.goals.filter(goal => goal.schedule_type === 'custom');
   }

   render() {
      return (
         <div className='container'>
            <a href='/create' className='btn'>Create</a>
            <div className='row'>
               <h2>Weekly</h2>
               {this.getWeeklyGoals().map(goal => <p key={shortid.generate()}>goal: {goal.title}</p>)}
            </div>
            <div className='row'>
               <h2>Weekdays</h2>
               {this.getWeekdaysGoals().map(goal => <p key={shortid.generate()}>goal: {goal.title}</p>)}
            </div>
            <div className='row'>
               <h2>End Date</h2>
               {this.getEndDateGoals().map(goal => <p key={shortid.generate()}>goal: {goal.title}</p>)}
            </div>
            <div className='row'>
               <h2>Daily</h2>
               {this.getDailyGoals().map(goal => <p key={shortid.generate()}>goal: {goal.title}</p>)}
            </div>
            <div className='row'>
               <h2>Custom</h2>
               {this.getCustomScheduleGoals().map(goal => <p key={shortid.generate()}>goal: {goal.title}</p>)}
            </div>
         </div>
      );
   }
}

export default connect(state => ({

}))(Goals);

import React from 'react';
import GoalCreate from './GoalCreate';
import DailyGoalReview from './components/DailyGoalReview';
import WeeklyGoalReview from './components/WeeklyGoalReview';
import WeekdaysGoalReview from './components/WeekdaysGoalReview';
import Checkbox from './components/Checkbox';
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

   getGoalsOfType= (type) => {
      return this.state.goals.filter(goal => goal.schedule_type === type);
   }

   render() {
      const goalsByType = ['weekly', 'weekdays', 'endDate', 'daily', 'custom']
         .map(type => {
            return this.getGoalsOfType(type).map(goal => {
               switch (goal.schedule_type) {
                  case 'daily':
                     return <DailyGoalReview goal={goal} />;
                  case 'weekly':
                     return <WeeklyGoalReview goal={goal} />;
                  case 'weekdays':
                     return <WeekdaysGoalReview goal={goal} />;
                  default:
               }
               // <p key={shortid.generate()}>goal: {goal.title}</p>)
            });
         });
      console.log(goalsByType);

      return (
         <div className='container'>
            <a href='/create' className='btn'>Create</a>
            <div className='row'>
               <h2>Daily</h2>
               {goalsByType[3]}
            </div>
            <div className='row'>
               <h2>Weekdays</h2>
               {goalsByType[1]}
            </div>
            <div className='row'>
               <h2>End Date</h2>
               {goalsByType[2]}
            </div>
            <div className='row'>
               <h2>Weekly</h2>
               {goalsByType[0]}
            </div>
            <div className='row'>
               <h2>Custom</h2>
               {goalsByType[4]}
            </div>
         </div>
      );
   }
}

export default connect(state => ({

}))(Goals);

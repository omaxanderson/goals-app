import React from 'react';
import GoalCreate from './GoalCreate';
import DailyGoalReview from './components/DailyGoalReview';
import WeeklyGoalReview from './components/WeeklyGoalReview';
import WeekdaysGoalReview from './components/WeekdaysGoalReview';
import EndDateGoalReview from './components/EndDateGoalReview';
import CustomGoalReview from './components/CustomGoalReview';
import Checkbox from './components/Checkbox';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import shortid from 'shortid';

class Goals extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         goals: [],
         items: ['weekly', 'weekdays', 'endDate', 'daily', 'custom'],

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
      //const goalsByType = ['weekly', 'weekdays', 'endDate', 'daily', 'custom']
      const goalsByType = this.state.items
         .map(type => {
            return this.getGoalsOfType(type).map(goal => {
               switch (goal.schedule_type) {
                  case 'daily':
                     return <DailyGoalReview goal={goal} />;
                  case 'weekly':
                     return <WeeklyGoalReview goal={goal} />;
                  case 'weekdays':
                     return <WeekdaysGoalReview goal={goal} />;
                  case 'endDate':
                     return <EndDateGoalReview goal={goal} />;
                  case 'custom':
                     return <CustomGoalReview goal={goal} />;
                  default:
               }
            });
         });
      console.log(goalsByType);
      const items = this.state.items.map(schedule => (
            <div className='row'>
               <h2>{schedule[0].toUpperCase()}{schedule.substring(1)}</h2>
               {goalsByType[this.state.items.indexOf(schedule)]}
            </div>
      ));
      /*,
            <div className='row'>
               <h2>Weekdays</h2>
               {goalsByType[this.state.items.indexOf('weekday')]}
            </div>,
            <div className='row'>
               <h2>End Date</h2>
               {goalsByType[this.state.items.indexOf('endDate')]}
            </div>,
            <div className='row'>
               <h2>Weekly</h2>
               {goalsByType[this.state.items.indexOf('weekly')]}
            </div>,
            <div className='row'>
               <h2>Custom</h2>
               {goalsByType[this.state.items.indexOf('custom')]}
            </div>
      ];
      */

      return (
         <div className='container'>
            <a href='/create' className='btn'>Create</a>
            <SortableList items={items} onSortEnd={this.onSortEnd} />
         </div>
      );
   }

   onSortEnd = ({oldIndex, newIndex}) => {
      let items = this.state.items.slice();
      const temp = items[oldIndex]
      items[oldIndex] = items[newIndex];
      items[newIndex] = temp;
      this.setState({ items });
   }
}

// @TODO get this sortable working
const SortableItem = SortableElement(({value}) => <li>{value}</li>);
const SortableList = SortableContainer(({items}) => {
   return (
      <ul>
         {items.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value} />))}
      </ul>
   )
});

export default connect(state => ({

}))(Goals);

import React from 'react';
import DailyGoalReview from './components/DailyGoalReview';
import WeeklyGoalReview from './components/WeeklyGoalReview';
import WeekdaysGoalReview from './components/WeekdaysGoalReview';
import EndDateGoalReview from './components/EndDateGoalReview';
import CustomGoalReview from './components/CustomGoalReview';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
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
   }

   getGoalsOfType = (type) => {
      return this.state.goals.filter(goal => goal.schedule_type === type);
   }

   cardWrap = (elem) => (
      <div key={shortid.generate()} className='card'>
         <div className='card-content'>
            {elem}
         </div>
      </div>
   );


   render() {
      //const goalsByType = ['weekly', 'weekdays', 'endDate', 'daily', 'custom']
      const goalsByType = this.state.items
         .map(type => {
            return this.getGoalsOfType(type).map(goal => {
               switch (goal.schedule_type) {
                  case 'daily':
                     return this.cardWrap(<DailyGoalReview key={goal.goal_id} goal={goal} />);
                  case 'weekly':
                     return this.cardWrap(<WeeklyGoalReview key={goal.goal_id} goal={goal} />);
                  case 'weekdays':
                     return this.cardWrap(<WeekdaysGoalReview key={goal.goal_id} goal={goal} />);
                  case 'endDate':
                     return this.cardWrap(<EndDateGoalReview key={goal.goal_id} goal={goal} />);
                  case 'custom':
                     return this.cardWrap(<CustomGoalReview key={goal.goal_id} goal={goal} />);
                  default:
               }
               return false;
            });
         });
      const items = this.state.items.map(schedule => (
            <div className='row'>
               <h2>{schedule[0].toUpperCase()}{schedule.substring(1)}</h2>
               {goalsByType[this.state.items.indexOf(schedule)]}
            </div>
      ));

      return (
         <div className='container'>
            <a href='/create' className='btn'>Create</a>
            <SortableList useDragHandle items={items} onSortEnd={this.onSortEnd} />
         </div>
      );
   }

   onSortEnd = ({oldIndex, newIndex}) => {
      let items = this.state.items.slice();

      const temp = items[oldIndex]
      items[oldIndex] = items[newIndex];
      items[newIndex] = temp;
      this.setState({ items });

      this.props.dispatch({
         type: 'GOAL_LIST_SORT',
         payload: this.state.items,
      });
   }
}

// @TODO nicely alight the handle with the title
//    heck the title could be part of the handle too...
const DragHandle = SortableHandle(() => <i className='material-icons'>menu</i>);
const SortableItem = SortableElement(({value}) => <li><DragHandle />{value}</li>);
const SortableList = SortableContainer(({items}) => {
   return (
      <ul>
         {items.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value} />))}
      </ul>
   )
});

export default connect(state => ({

}))(Goals);

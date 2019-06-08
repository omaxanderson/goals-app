import React from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import get from 'lodash/get';
import shortid from 'shortid';
import DailyGoalReview from './components/DailyGoalReview';
import WeeklyGoalReview from './components/WeeklyGoalReview';
import WeekdaysGoalReview from './components/WeekdaysGoalReview';
import EndDateGoalReview from './components/EndDateGoalReview';
import CustomGoalReview from './components/CustomGoalReview';
import Navbar from './components/Navbar';

class Goals extends React.Component {
   constructor(props) {
      console.log('constructor', props.list);
      super(props);

      this.state = {
         goals: this.props.goals,
         list: this.props.list,
      // items: ['weekly', 'weekdays', 'daily', 'custom', 'endDate'],
      };
   }

   async componentDidMount() {
      this.props.dispatch({
         type: 'FETCH_GOALS',
      });
   }

   getGoalsOfType = type => this.props.goals.filter(goal => goal.schedule_type === type)

   cardWrap = elem => (
      <div key={shortid.generate()} className="card">
         <div className="card-content">
            {elem}
         </div>
      </div>
   );


   render() {
      console.log('props', this.props);
      console.log('state', this.state);
      const goalsByType = this.props.list
         .map(type => this.getGoalsOfType(type).map((goal) => {
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
         }));
      const list = this.props.list.map(schedule => (
         <div className="row">
            <h2 style={{ marginTop: '0px' }}>
               <span style={{ marginRight: '20px' }}><DragHandle /></span>
               {schedule[0].toUpperCase()}
               {schedule.substring(1)}
            </h2>
            {goalsByType[this.props.list.indexOf(schedule)]}
         </div>
      ));

      return (
         <React.Fragment>
            <Navbar />
            <div className="container">
               <SortableList useDragHandle items={list} onSortEnd={this.onSortEnd} />
            </div>
         </React.Fragment>
      );
   }

   onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex === newIndex) {
         return;
      }

      const list = this.state.list.slice();

      const temp = list[oldIndex];
      list[oldIndex] = list[newIndex];
      list[newIndex] = temp;
      this.setState({ list });

      this.props.dispatch({
         type: 'GOAL_LIST_SORT',
         payload: this.state.list,
      });
   }
}

// @TODO nicely alight the handle with the title
//    heck the title could be part of the handle too...
const DragHandle = SortableHandle(() => <i className="material-icons hover-pointer">menu</i>);
const SortableItem = SortableElement(({ value }) => <div>{value}</div>);
const SortableList = SortableContainer(({ items }) => (
   <ul>
      {items.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value} />))}
   </ul>
));

export default connect(state => ({
   list: get(state, 'goals.list', []),
   goals: get(state, 'goals.goals', []),
}))(Goals);

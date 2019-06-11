import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import Navbar from './components/Navbar';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class Calendar extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         view: 'm',
         month: moment().month(),
         year: moment().year(),
      };

      document.addEventListener('keydown', this.onKeyDown);
   }

   componentDidMount() {
      this.props.dispatch({
         type: 'FETCH_GOALS',
         params: {
            f_goal_types: 'weekly,weekdays,daily,endDate',
         },
      });

   }

   nextMonth = () => {
      const d = moment().month(this.state.month).year(this.state.year).add(1, 'month');
      this.setState({ month: d.month(), year: d.year() });
   }

   previousMonth = () => {
      const d = moment().month(this.state.month).year(this.state.year).subtract(1, 'month');
      this.setState({ month: d.month(), year: d.year() });
   }

   onKeyDown = ({ keyCode }) => {
      if ([87, 77].includes(keyCode)) {
         this.setState({ view: keyCode === 87 ? 'w' : 'm' });
      } else if ([37, 39].includes(keyCode)) {
         keyCode === 37 ? this.previousMonth() : this.nextMonth();
      }
   }

   getSelectOptions = () => {
      const t = this.props.goals.map(goal => (
         <option
            key={`select_${goal.goal_id}`}
            value={goal.goal_id}
         >
         {goal.title}
         </option>
      ));
      console.log(t);
      return t;
   }

   render() {
      const { view } = this.state;
      // @TODO get this form select working properly
      M.FormSelect.init(document.querySelectorAll('select'));

      return (
         <React.Fragment>
            <Navbar />
            <div className="row" style={{ marginBottom: '0px' }}>
               <div className="col s4">
                  <button
                    onClick={this.previousMonth}
                     style={{ marginLeft: '3vw', marginTop: '1.3rem' }}
                    className="left btn-floating cyan"
                  >
                     <i className="material-icons">arrow_back</i>
                  </button>
               </div>
               <div className="col s4">
                  <div className="center-align">
                     <h4>{moment().month(this.state.month).year(this.state.year).format('MMMM YYYY')}</h4>
                  </div>
               </div>
               <div className="col s4">
                  <div className='input-field'>
                     <select multiple>
                        {this.getSelectOptions()}
                     </select>
                  </div>
                  <button
                    onClick={this.nextMonth}
                    style={{ marginRight: '3vw', marginTop: '1.3rem' }}
                    className="right btn-floating cyan"
                  >
                     <i className="material-icons">arrow_forward</i>
                  </button>
               </div>
            </div>
            {view === 'm'
               && (
                  <React.Fragment>
                     <div style={{ height: '20px' }}>
                        {
                           _.range(0, 7).map(num => (
                              <div
                                 key={`label-${num}`}
                                 className="center-align"
                                style={{ display: 'inline-block', width: `${100 / 7}%` }}
                              >
                                 {moment().day(num).format('ddd')}
                              </div>
                           ))
                        }
                     </div>

                     <Grid
                        month={this.state.month}
                        year={this.state.year}
                        goals={this.props.goals}
                     />
                  </React.Fragment>
               )
            }
         </React.Fragment>
      );
   }
}

export default connect(state => ({
   goals: _.get(state, 'goals.goals', []),
}))(Calendar);

class Grid extends React.Component {
   render() {
      return (
         <div id="calendar-container">
            { this.getWeeks(this.props.month, this.props.year) }
         </div>
      );
   }

   // man this is hacky...
   getWeeks = (month, year) => {
      const d = moment().month(month).year(year);
      let height = 100 / (d.endOf('month').week() - d.startOf('month').week() + 1);
      if (height < 0) {
         height = 100 / (moment(d).endOf('year').subtract(1, 'week').week() - d.startOf('month').week() + 2);
      }
      const monthEnd = d.endOf('month').date();
      const startDay = d.startOf('month').day();
      const monthArr = _.range(1, monthEnd + 1);
      // can't use the d variable reliably any more since this modifies it
      const previousMonth = d.subtract(1, 'month').endOf('month').date();
      const previousMonthArr = _.reverse(_.range(previousMonth, previousMonth - startDay));

      const current = monthArr.map(num => ({
         num,
         month,
         color: 'black',
      }));
      const previous = previousMonthArr.map(num => ({
         num,
         month: d.month(),
         color: '#AAAAAA',
      }));

      let fullArr = previous.concat(current);

      let additional = 1;
      while (fullArr.length % 7) {
         fullArr = fullArr.concat([
            {
               num: additional++,
               color: '#AAAAAA',
               month: moment().month(month).year(year).add(1, 'month')
                  .month(),
            },
         ]);
      }

      const days = _.range(0, fullArr.length / 7).map(week => (
         <div key={`week_${week}`} style={{ overflow: 'hidden', height: `${height}%` }}>
            {fullArr.slice(week * 7, week * 7 + 7).map(({ num, color, month}) => (
               <div
                  key={`day__${num}__${week}`}
                  style={{
                     height: '100%',
                     width: '14.286%',
                     display: 'inline-table',
                     borderLeft: '1px solid #CCCCCC',
                     borderTop: '1px solid #CCCCCC',
                     padding: '5px',
                  }}
                  className='day-container'
               >
                  <div
                    key={`day_${num}`}
                    style={{ paddingLeft: '0.5vw', color }}
                  >
                     {num}
                  </div>
               { this.props.goals.map(goal => {
                  // num is the day of month
                  if (goal.schedule_type === 'weekdays') {

                  } else if (goal.schedule_type === 'daily') {
                     const date = moment().year(year).month(month).date(num).format('YYYY-MM-DD');
                     const completed = goal.completed.find(review => {
                        return review.date === date && review.completed;
                     });
                     if (completed) {
                        // lol this isn't really a unique key per se...
                        return <div key={`${Math.random() * 1000000}`}>Daily!</div>;
                     }
                  } else if (goal.schedule_type === 'endDate') {
                     if (moment(goal.end_date).format('YYYY-MM-DD')
                        === moment().month(month).date(num).year(year).format('YYYY-MM-DD')) {
                        return <div>End Date!</div>;
                     }
                  } else if (goal.schedule_type === 'weekly') {
                     const week = moment().month(month).year(year).date(num).week();
                     const completed = goal.completed.find(review => (review.week_number === week
                        && review.year === year
                        && review.completed
                     ));
                     if (completed) {
                        // lol this isn't really a unique key per se...
                        return <div key={`${Math.random() * 1000000}`}>Weekly!</div>
                     }
                  }

                  return false;
               }) }
               </div>
            ))}
         </div>
      ));

      return days;
   }
}

Grid.defaultProps = {
   goals: [],
}

import React from 'react';
import Navbar from './components/Navbar';
import _ from 'lodash';
import moment from 'moment';

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

   onKeyDown = ({keyCode}) => {
      if ([87, 77].includes(keyCode)) {
         this.setState({ view: keyCode === 87 ? 'w' : 'm' });
      } else if ([37, 39].includes(keyCode)) {
         this.setState({ month: keyCode === 37 ? this.state.month - 1 : this.state.month + 1 });
      }
   }

   render() {
      const { view } = this.state;
      return (
         <React.Fragment>
            <Navbar />
            <div className='row'>
               <div className='col s4'>
                  <button
                     onClick={() => this.setState({ month: this.state.month - 1 })}
                     style={{marginLeft: '3vw', marginTop: '1.3rem'}}
                     className='left btn-floating waves-effect red'
                  >
                     <i className='material-icons'>arrow_back</i>
                  </button>
               </div>
               <div className='col s4'>
                  <div className='center-align'>
                     <h4>{moment().month(this.state.month).format('MMMM')}</h4>
                  </div>
               </div>
               <div className='col s4'>
                  <button
                     onClick={() => this.setState({ month: this.state.month + 1 })}
                     style={{marginRight: '3vw', marginTop: '1.3rem'}}
                     className='right btn-floating waves-effect waves-light red'
                  >
                     <i className='material-icons'>arrow_forward</i>
                  </button>
               </div>
            </div>
            {view === 'm' &&
               <Grid
                  month={this.state.month}
                  year={this.state.year}
               />
            }
         </React.Fragment>
      );
   }
}

class Grid extends React.Component {
   render() {
      return (
         <div id='calendar-container'>
            { this.getWeeks(this.props.month, this.props.year) }
         </div>
      );
   }

   // man this is hacky...
   getWeeks = (month, year) => {
      const d = moment().month(month).year(year);
      const height = 100 / (d.endOf('month').week() - d.startOf('month').week() + 1);
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
               month: moment().month(month).year(year).add(1, 'month').month()
            }
         ]);
      }

      const days = _.range(0, fullArr.length / 7).map(week => {
         return (
            <div key={`week_${week}`} style={{ height: `${height}%` }}>
               {fullArr.slice(week * 7, week * 7 + 7).map(({num, color}) => (
                  <div
                     key={`day__${num}`}
                     style={{
                        height: '100%',
                        width: '14.286%',
                        display: 'inline-block',
                        borderLeft: '1px solid #CCCCCC',
                        borderTop: '1px solid #CCCCCC',
                     }}
                  >
                     <span
                        key={`day_${num}`}
                        style={{paddingLeft: '1vw', color}}
                     >
                        {num}
                     </span>
                  </div>
               ))}
            </div>
         )
      });

      return days;
   }
}

// @TODO add the redux store
export default Calendar;

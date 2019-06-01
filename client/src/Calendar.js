import React from 'react';
import Navbar from './components/Navbar';
import _ from 'lodash';
import moment from 'moment';

class Calendar extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         view: 'm',
      };

      document.addEventListener('keydown', this.onKeyDown);
   }

   // might not need this
   toggleView = () => {
      this.setState({ view: this.state.view === 'm' ? 'w' : 'm' });
   }

   onKeyDown = ({keyCode}) => {
      if ([87, 77].includes(keyCode)) {
         this.setState({ view: keyCode === 87 ? 'w' : 'm' });
      }
   }

   render() {
      const { view } = this.state;
      return (
         <React.Fragment>
            <Navbar />
            <div>hello { view === 'm' ? 'month' : 'week' } view</div>
            <Grid />
         </React.Fragment>
      );
   }
}

// 1.7142
// @TODO figure out a better way to do this
//    This might be better off either using a calendar api (lame)
//    or removing the Materialize css from these components
//
//    Alternatively, maybe I could work with the Materialize styling, it might not look too bad
class Grid extends React.Component {
   render() {
      return (
         <div className='container'>
            {this.getWeeks()}
         </div>
      );
   }

   getWeeks = () => {
      const dayArr = moment().endOf('month').date();
      console.log('dayArr', dayArr);
      const days = _.range(0,5).map(n => {
         return (<div key={`week_${n}`} style={{height: '10vh'}}>
               {
                  _.range(0,7).map(m => (
                     <div
                        key={`day__${n * 7 + m + 1}`}
                        style={{height: '100%', width: '14.286%', display: 'inline-block', border: '1px solid black'}}
                     >
                           <span key={`day_${n * 7 + m + 1}`} style={{paddingLeft: '1vw'}}>{n * 7 + m + 1 <= dayArr ? n * 7 + m + 1 : ''}</span>
                     </div>)
                  )
               }
            </div>
         );
      });
      return days;
   }
}

// @TODO add the redux store
export default Calendar;

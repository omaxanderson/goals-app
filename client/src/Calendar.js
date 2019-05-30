import React from 'react';
import Navbar from './components/Navbar';

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
      this.setState({ view: this.state.view == 'm' ? 'w' : 'm' });
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
            <div>hello { view == 'm' ? 'month' : 'week' } view</div>
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
            <div style={{overflow: 'hidden'}}>
               <div style={{margin: '0 -10%'}}>
                  <div className='row' style={{marginLeft: '5%'}}>
                     <div className='teal center col' style={{width: '10%', height: '7vh'}}>1</div>
                     <div className='teal center col s1' style={{width: '10%', height: '7vh'}}>2</div>
                     <div className='teal center col s1' style={{width: '10%', height: '7vh'}}>3</div>
                     <div className='teal center col s1' style={{width: '10%', height: '7vh'}}>4</div>
                     <div className='teal center col s1' style={{width: '10%', height: '7vh'}}>5</div>
                     <div className='teal center col s1' style={{width: '10%', height: '7vh'}}>6</div>
                     <div className='teal center col s1' style={{width: '10%', height: '7vh'}}>7</div>
                  </div>
                  <div className='row' style={{marginLeft: '5%'}}>
                  </div>
                  <div className='row' style={{marginLeft: '5%'}}>
                  </div>
                  <div className='row' style={{marginLeft: '5%'}}>
                  </div>
                  <div className='row' style={{marginLeft: '5%'}}>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

// @TODO add the redux store
export default Calendar;

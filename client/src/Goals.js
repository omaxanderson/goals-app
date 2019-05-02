import React from 'react';
import GoalCreate from './GoalCreate';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class Goals extends React.Component {
   componentDidMount() {
      M.Tabs.init(document.querySelector('.tabs'), {});
   }

   dispatchTest = () => {
      console.log('dispatching');
      this.props.dispatch({
         type: 'GOALS_TEST',
         payload: { hello: 'world' },
      });
   }

   render() {
      return (
         <div className='row'>
            <div className='col s12'>
               <ul className='tabs'>
                  <li className='tab col s4'><a href='#createGoal'>Create</a></li>
                  <li className='tab col s4'><a href='#goals'>Goals</a></li>
               </ul>
            </div>
            <div id='createGoal'>
               <h1 style={{ marginTop: '0px'}} >App</h1>
               <button onClick={this.post}>Post</button><br />
               <button onClick={this.dispatchTest}>Dispatch Test</button><br />
               <button onClick={this.delete}>Delete</button><br />
               <button onClick={() => this.put()}>Put</button><br />
               <input onChange={() => this.updateId()} type='text' id='idField' /><br />
               </div>
               <GoalCreate />
            <div id='goals'>
               Goals
            </div>
         </div>
      );
   }
}

export default connect(state => ({

}))(Goals);

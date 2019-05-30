import React from 'react';
import Goals from './Goals';
import GoalCreate from './GoalCreate';
import CustomGoalChart from './CustomGoalChart';
import Calendar from './Calendar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <Switch>
                  <Route exact path='/' component={Goals} />
                  <Route path='/create' component={GoalCreate} />
                  <Route path='/chart' component={CustomGoalChart} />
                  <Route path='/calendar' component={Calendar} />
                  <Route path='*' component={FourOhFour} />
               </Switch>
            </Router>
         </Provider>
      )
   }
}

class FourOhFour extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         imageUrl: '',
      };
   }

   componentDidMount() {
      fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(data => {
         console.log(data);
         this.setState({ imageUrl: data.message });
      });
   }

   render() {
      return (
         <div>
            <h3>404 Bruh wrong path</h3>
            <p>But here's a random pic of a dog</p>
            <img src={this.state.imageUrl || ''} alt='random dog' />
         </div>
      );
   }
}

export default App;

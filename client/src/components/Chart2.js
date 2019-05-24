import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import range from 'lodash.range';
import flatten from 'lodash.flatten';
import { Line } from 'react-chartjs-2';

class Chart extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: {
            labels: ['l1', 'l2', 'l3', 'l4'],
            datasets: [
               {
                  label: '# of votes',
                  data: [1, -3, 1,9,3],
                  lineTension: 0,
                  backgroundColor: [
                     'rgba(255, 99, 132, .2)',
                  ],
                  borderColor: [
                     'rgba(0, 255, 20, .2)',
                  ],
                  borderWidth: 1,
               },
               {
                  label: 'number of something',
                  data: [1, 13, 0,2,15],
                  lineTension: 0,
                  backgroundColor: [
                     'rgba(20, 200, 0, .2)',
                  ],
                  borderColor: [
                     'rgba(0, 255, 20, .2)',
                  ],
                  borderWidth: 1,
               },
            ],
         }
      }
   }

   getLabels = (type, format) => {
      const goals = this.props[type];
      if (!goals.length) {
         return [];
      }
      if (type === 'weekly') {
         // 1. Get min and max in format YYYYWW
         // 2. Get an array spanning between those two
         // 3. Convert those strings into formatted dates
         const sorted = flatten(goals.map(goal =>
               goal.completed.map(date =>
                  Number(moment().year(date.year).week(date.week).format('YYYYww'))
               )
            ))
            .sort();
         return range(sorted[0], sorted[sorted.length - 1] + 1)
            .map(date => (
               moment()
                  .year(Math.floor(date / 100))
                  .week(date % 100)
                  .format(format || 'YYYY-MM-DD')
            ));
      }
   }

   convertDataFromGoals = (type) => {
      const goals = this.props[type];
      console.log(goals);
      if (!goals.length) {
         return [];
      }
      if (type === 'weekly') {
         const labels = this.getLabels('weekly', 'YYYYww');
         const datasets = goals.map(goal => {
               return goal.completed.map(date => {
                  return [`${date.year}${date.week}`, date.amount]
               });
            })
            .map(goal => {
               return labels.map(label => {
                  const exists = goal.find(([key, amount]) => key === label);
                  return exists && exists.length > 1 ? exists[1] : 0;
               });
            });
         return datasets;
      }
   }

   getDatasets = (type) => {
      return this.convertDataFromGoals(type).map(dataset => ({
         lineTension: 0,
         label: _.capitalize(type),
         fill: false,
         backgroundColor: [
            'rgba(0, 255, 20, .2)',
         ],
         borderColor: [
            'rgba(0, 255, 20, .2)',
         ],
         data: dataset,
      }));
   }

   render() {
      const weeklyDatasets = this.getDatasets('weekly');
      console.log(weeklyDatasets);
      const weeklyData = {
         labels: this.getLabels('weekly'),
         datasets: this.getDatasets('weekly'),
      }
      return (
         <div>
            <h2>Test</h2>
            <Line
               data={weeklyData}
            />
         </div>
      );
   }
}

export default Chart;

import React from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends React.Component {

   componentDidMount() {
      const chart = this.chart;
      chart.render();
   }
   render() {
      const dataPoints = [
         {
            x: 1,
            y: 1,
         },
         {
            x: 3,
            y: 1,
         },
         {
            x: 4,
            y: 2,
         },
         {
            x: 5,
            y: 5,
         },
      ];
      return (
         <CanvasJSChart options={{
            theme: 'light2',
            title: {
               text: 'test',
            },
            axisY: {
               title: 'y axis',
               includeZero: true,
            },
            data: [{
               type: 'line',
               dataPoints: dataPoints,
            }],
         }}
         ref={ref => this.chart = ref}
         />
      );
   }

}

export default Chart;

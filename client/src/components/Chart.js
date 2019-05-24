import React from 'react';
import moment from 'moment';
import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends React.Component {

   componentDidMount() {
      const chart = this.chart;
      chart.render();
   }

   render() {
      console.log(moment().week(19).format('YYYY-MM-DD'));
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
            data: [
               {
                  type: 'line',
                  xValueFormatString: 'YYYY-MM-DD',
                  dataPoints: this.props.weeklyData[0],
               },
               {
                  type: 'line',
                  xValueFormatString: 'YYYY-MM-DD',
                  dataPoints: this.props.weeklyData[1],
               },
            ],
         }}
         ref={ref => this.chart = ref}
         />
      );
   }
}

export default Chart;

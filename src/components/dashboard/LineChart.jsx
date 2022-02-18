import React from 'react'
import { Card, CardHeader} from 'reactstrap'
import Chart from 'react-apexcharts'

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          
      series: [{
          name: "Valor",
          data: [1, 1.0256, 1.0234, 1.0351, 1.051, 1.0462, 1.0536, 1.0716]
      }],
      options: {
        chart: {
          height: 320,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        // title: {
        //   text: 'Valor Patrimonial do Token/Cota',
        //   align: 'left'
        // },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jun/2021', 'Jul/2021', 'Aug/2021', 'Sep/2021', 'Out/2021', 'Nov/2021', 'Dez/2021', 'Jan/2022'],
        }
      },
    
    
    };
  }



  render() {
    return (
        <>
        <Card  color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">Valor Patrimonial do Token/Cota</CardHeader>
            <Card body>
                <div id="chart">
                  <Chart 
                  options={this.state.options} 
                  series={this.state.series} 
                  type="line" 
                  height={450} 
                  />
                </div>
                </Card>
        </Card>
        </>
    );
  }
}
export default LineChart;
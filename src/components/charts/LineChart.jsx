import React from 'react'
import { Card, CardHeader} from 'reactstrap'
import Chart from 'react-apexcharts'

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {          
      series: [
        {
          name: "Valor",
          data: this.props.portfolio_linechart.map(a=>a.token_price)
      }],
      options: {
        xaxis: {
          categories: this.props.portfolio_linechart.map(a=>a.date),
        },
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
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
      },
    
    
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.portfolio_linechart !== prevProps.portfolio_linechart) {
      this.setState((prevState)=> ({
        ...prevState,
        series: [
          {
            name: "Valor",
            data: this.props.portfolio_linechart.map(a=>a.token_price)
        }],
        options: {
          ...prevState.options,
          xaxis: {
            categories: this.props.portfolio_linechart.map(a=>a.date),
          },
        }
      }))
    }
  }




  render() {
    return (
        <>
        <Card  color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">Valor Patrimonial do seu Token/Cota</CardHeader>
            <Card body>
                <div id="chart">
                  <Chart 
                  options={this.state.options} 
                  series={this.state.series} 
                  type="line" 
                  height={400} 
                  />
                </div>
                </Card>
        </Card>
        </>
    );
  }
}
export default LineChart;
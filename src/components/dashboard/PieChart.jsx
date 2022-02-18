import React from 'react'
import { Card, CardHeader} from 'reactstrap'
import Chart from 'react-apexcharts'

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [44, 55, 33, 43],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Fundos Imobiliários', 'Criptomoedas', 'Caixa', 'Ativos Internacionais'],
        theme: {
          mode: 'light', 
          palette: 'palette6', 
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center', 
          floating: false,

      }
      
      },
    };
  }



  render() {
    return (
        <>
        <Card  color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">PieChart</CardHeader>
            <Card body>
                <div id="chart3">
                  <Chart 
                  options={this.state.options} 
                  series={this.state.series} 
                  type="pie" 
                  height={450} 
                  />
                </div>
                </Card>
        </Card>
        </>
    );
  }
}
export default PieChart;
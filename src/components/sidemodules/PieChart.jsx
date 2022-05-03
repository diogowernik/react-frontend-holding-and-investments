import React from 'react'
import { Card, CardHeader} from 'reactstrap'
import Chart from 'react-apexcharts'

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {    
      series: [],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
        theme: {
          mode: 'light', 
          palette: 'palette2', 
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
        {/* {console.log(this.props.categories_total.map(a=>a.name))} */}
        <Card  color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">PieChart</CardHeader>
            <Card body>
                <div id="chart3">
                  <Chart 
                  options={this.state.options} 
                  series={this.props.categories_total.map(a=>a.total_today_brl)} 
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
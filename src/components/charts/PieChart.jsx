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
        colors: [
          '#009c3b', // Verde
          '#F7B844', // Amarelo
          '#002776', // Azul
          '#AF5B00', // Laranja Escuro
          '#533EAA', // Roxo
          '#504100', // Marrom
          '#1E5D8C', // Azul Escuro
          '#421243', // Roxo Escuro
          '#7F94B0', // Azul Claro
          '#EF6537', // Laranja
          '#C0ADDB', // Roxo Claro
          '#5e4fa2', // Roxo Médio
          ],
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center', 
          floating: false,

      }
      
      },
    };
  }


  componentDidUpdate(prevProps) {
    if (this.props.total !== prevProps.total) {
      this.setState((prevState)=> ({
        ...prevState,
        options:{ ...prevState.options,
                  labels: this.props.total.map(a=>a.name),                  
                }
      }))
    }    
  }


  render() {
    return (
        <>
       


        <Card  color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">PieChart</CardHeader>
            <Card body>
                <div 
                id="chart3" 
                >
                  <Chart 
                  options={this.state.options} 
                  series={this.props.total.map(a=>a.total_today_brl)} 
                  type="pie" 
                  // height={450} 
                  />
                </div>
                </Card>
        </Card>
        </>
    );
  }
}
export default PieChart;
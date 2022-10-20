import React from 'react';
import Chart from 'react-apexcharts'
import {  Card, CardHeader} from 'reactstrap'

class TreeMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'treemap',
          toolbar: {
            show: false,}
        },
        theme: {
          mode: 'light', 
          palette: 'palette2', 
      },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          formatter: function(text, op) {
            // return [text]
            return [text, op.value.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 })];
          },
          offsetY: -4
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
          '#5e4fa2' // Roxo Médio
          ],
        tooltip: {
          y: {
            formatter: function(value) {
              return value.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
          }
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'left',
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial',
          fontWeight: 400,
          width:'20px',
        },
      },
      series: [
        {
          name: '',
          data: []
        }
      ]
    }
  }

  render() {
    return ( 
        <>
        <Card  color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">
              <h4>Investimentos</h4>
            </CardHeader>
            <Card body>
                <Chart
                    options={this.state.options}
                    series={this.props.portfolio_treemap}
                    type='treemap'
                    height="570"
                    width="100%"
                />
                </Card>
        </Card>
        </>
    );
  }
}
export default TreeMap;
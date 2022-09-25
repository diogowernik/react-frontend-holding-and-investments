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
            return [text, op.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })]
          },
          offsetY: -4
        },
        colors: [
          '#3B93A5',
          '#F7B844',
          '#38BC6A',
          '#EC3C65',
          '#748C38',
          '#8A1459',
          '#1E5D8C',
          '#421243',
          '#7F94B0',
          '#EF6537',
          '#C0ADDB',
          '#5e4fa2'
          ],
        tooltip: {
          y: {
            formatter: function(value) {
              return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
            <CardHeader className="bg-gray-lighter">Meus Investimentos</CardHeader>
            <Card body>
                <Chart
                    options={this.state.options}
                    series={this.props.portfolio_treemap}
                    type='treemap'
                    height="450"
                    width="100%"
                />
                </Card>
        </Card>
        </>
    );
  }
}
export default TreeMap;
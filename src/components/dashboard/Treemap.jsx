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
          palette: 'palette8', 
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
      // series: [
      //   {
      //     name: '',
      //     data: []
      //   }
      // ]
      series: [
        {
          name: 'Ações e Negocios',
          data: [
            {
              x: 'BBAS3',
              y: 10
            },
            {
              x: 'SANB11',
              y: 60
            },
            {
              x: 'CASH3',
              y: 41
            }
          ]
        },
        {
          name: 'Real State',
          data: [
            {
              x: 'HGLG11',
              y: 10
            },
            {
              x: 'HCTR11',
              y: 20
            },
            {
              x: 'KDIF11',
              y: 51
            },
            {
              x: 'CASA 2',
              y: 30
            },
            {
              x: 'AP 522',
              y: 30
            }
          ]
        }
      ],
    }
  }

  // fetchData() {
  //   fetch(`http://localhost:3001/api/portfolios/1`)
  //     .then(response => response.json())
  //     .then(
  //       (response) => {
  //         const newSeries = [];
  //         var chart = response.treechart;
  //         newSeries.push({chart});

  //         this.setState({
  //           series: chart,
  //         });
  //       });
  // }

  componentDidMount() {
    // this.fetchData();
  }

  render() {
    return ( 
        <>
        <Card  color="gray" className="mb-3">
            <CardHeader className="bg-gray-lighter">Minha Arca</CardHeader>
            <Card body>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
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
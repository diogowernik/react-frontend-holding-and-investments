import React from 'react';
import Chart from 'react-apexcharts';

class StackedChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.series,
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: props.title
        },
        xaxis: {
          categories: props.categories
        },
        yaxis: {
          title: {
            text: undefined
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K"
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.series !== this.props.series || prevProps.categories !== this.props.categories) {
      this.setState({
        series: this.props.series,
        options: { ...this.state.options, xaxis: { ...this.state.options.xaxis, categories: this.props.categories } }
      });
    }
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={600}
      />
    );
  }
}

export default StackedChart;

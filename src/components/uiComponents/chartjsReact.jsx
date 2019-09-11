import React, { Component } from "react";
import Chart from "chart.js";

class ChartjsReact extends Component {
  chartRef = React.createRef();

  //This is being interpreted before the elements have finished being created in the DOM.
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: this.props.title,
            data: this.props.data,
            backgroundColor: ["rgba(54, 162, 235, 0.6)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
  render() {
    return (
      <div>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default ChartjsReact;

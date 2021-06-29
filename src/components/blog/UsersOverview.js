import React from "react";
import { Row, Card, CardHeader, CardBody } from "shards-react";
import Chart from "../../utils/chart";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 7 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      // ...this.props.chartOptions
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "bar",
      data: this.props.chartData,
      options: chartOptions
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
  }

  render() {
    // const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Vacinados no Brasil ou no exterior</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
          
          </Row>
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}



export default UsersOverview;

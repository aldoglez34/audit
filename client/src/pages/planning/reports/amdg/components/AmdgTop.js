import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Row, Col, Tab, ListGroup, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import Chart from "chart.js";
import API from "../../../../../utils/API";

class AmdgTop extends PureComponent {
  state = {
    cuenta: "",
    chart: ""
  };

  formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  generateChart = data => {
    console.log("@generateChart", data);
    // get month indexes
    let eneroIndex = data.map(m => m.month).indexOf("ENERO");
    let febreroIndex = data.map(m => m.month).indexOf("FEBRERO");
    let marzoIndex = data.map(m => m.month).indexOf("MARZO");
    let abrilIndex = data.map(m => m.month).indexOf("ABRIL");
    let mayoIndex = data.map(m => m.month).indexOf("MAYO");
    let junioIndex = data.map(m => m.month).indexOf("JUNIO");
    let julioIndex = data.map(m => m.month).indexOf("JULIO");
    let agostoIndex = data.map(m => m.month).indexOf("AGOSTO");
    let septiembreIndex = data.map(m => m.month).indexOf("SEPTIEMBRE");
    let octubreIndex = data.map(m => m.month).indexOf("OCTUBRE");
    let noviembreIndex = data.map(m => m.month).indexOf("NOVIEMBRE");
    let diciembreIndex = data.map(m => m.month).indexOf("DICIEMBRE");

    // create chart
    let ctx = document
      .getElementById(data[0].cuentaContable + "_chart")
      .getContext("2d");
    let myChart = new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ],
        datasets: [
          {
            label: "Total Cargos",
            // barThickness: 20,
            data: [
              eneroIndex !== -1 ? data[eneroIndex].total_cargos : 0,
              febreroIndex !== -1 ? data[febreroIndex].total_cargos : 0,
              marzoIndex !== -1 ? data[marzoIndex].total_cargos : 0,
              abrilIndex !== -1 ? data[abrilIndex].total_cargos : 0,
              mayoIndex !== -1 ? data[mayoIndex].total_cargos : 0,
              junioIndex !== -1 ? data[junioIndex].total_cargos : 0,
              julioIndex !== -1 ? data[julioIndex].total_cargos : 0,
              agostoIndex !== -1 ? data[agostoIndex].total_cargos : 0,
              septiembreIndex !== -1 ? data[septiembreIndex].total_cargos : 0,
              octubreIndex !== -1 ? data[octubreIndex].total_cargos : 0,
              noviembreIndex !== -1 ? data[noviembreIndex].total_cargos : 0,
              diciembreIndex !== -1 ? data[diciembreIndex].total_cargos : 0
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 25,
            right: 25,
            top: 0,
            bottom: 0
          }
        },
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
  };

  initChart = cuenta => {
    // set first cuenta in the top cuentas in the state
    this.setState({ cuenta }, () => {
      // after that, fetch info from that cuenta
      API.report_Amdg_cuenta({
        auditId: this.props.audit.auditId,
        cuentaContable: this.state.cuenta.cuentaContable
      })
        .then(res => {
          this.setState({ chart: res.data }, () =>
            this.generateChart(this.state.chart)
          );
        })
        .catch(err => console.log(err));
    });
  };

  componentDidMount() {
    this.initChart(this.props.top[0]);
  }

  render() {
    return (
      <React.Fragment>
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey={"#" + this.props.top[0].cuentaContable}
        >
          <Row>
            <Col sm={4}>
              <ListGroup>
                {this.props.top.map(c => {
                  return (
                    <ListGroup.Item
                      action
                      className="d-flex flex-column"
                      href={"#" + c.cuentaContable}
                      key={c.cuentaContable}
                      onClick={() => this.initChart(c)}
                    >
                      <strong>{c.cuentaContable}</strong>
                      <span>{c.cuentaDescripción}</span>
                      <span>{"$" + this.formatNumber(c.total_cargos)}</span>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
            <Col sm={8}>
              {this.state.cuenta && this.state.chart ? (
                <div>
                  <h5>
                    <small className="text-muted mr-2">Cuenta:</small>
                    {this.state.cuenta.cuentaContable}
                  </h5>
                  <h5>
                    <small className="text-muted mr-2">Descripción:</small>
                    {this.state.cuenta.cuentaDescripción}
                  </h5>
                  <h5>
                    <small className="text-muted mr-2">Total cargos:</small>
                    {this.formatNumber(this.state.cuenta.total_cargos)}
                  </h5>
                  {/* chart */}
                  <canvas
                    id={this.state.cuenta.cuentaContable + "_chart"}
                    className="w-100"
                  />
                  {/* {this.generateChart()} */}
                  {/* {this.generateChart(this.state.chart)} */}
                  {/* {this.generateChart(this.state.chart)} */}
                  {/* <canvas id="myChart" className="w-100" /> */}
                  {/* <AmdgChart cuenta={cuenta} /> */}
                </div>
              ) : (
                <div className="text-center mt-4 pt-4">
                  <Spinner animation="border" />
                </div>
              )}
            </Col>
          </Row>
        </Tab.Container>
      </React.Fragment>
    );
  }
}

AmdgTop.propTypes = {
  top: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    audit: state.audit
  };
};

export default connect(mapStateToProps, null)(AmdgTop);

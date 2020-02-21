import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import API from "../../../../../utils/API";
import { Spinner } from "react-bootstrap";
import Chart from "chart.js";

const AmdgChart = React.memo(function AmdgChart(props) {
  const audit = useSelector(state => state.audit);

  const [chart, setChart] = useState([]);

  const formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const generateChart = report => {
    // get month indexes
    let eneroIndex = report.map(m => m.month).indexOf("ENERO");
    let febreroIndex = report.map(m => m.month).indexOf("FEBRERO");
    let marzoIndex = report.map(m => m.month).indexOf("MARZO");
    let abrilIndex = report.map(m => m.month).indexOf("ABRIL");
    let mayoIndex = report.map(m => m.month).indexOf("MAYO");
    let junioIndex = report.map(m => m.month).indexOf("JUNIO");
    let julioIndex = report.map(m => m.month).indexOf("JULIO");
    let agostoIndex = report.map(m => m.month).indexOf("AGOSTO");
    let septiembreIndex = report.map(m => m.month).indexOf("SEPTIEMBRE");
    let octubreIndex = report.map(m => m.month).indexOf("OCTUBRE");
    let noviembreIndex = report.map(m => m.month).indexOf("NOVIEMBRE");
    let diciembreIndex = report.map(m => m.month).indexOf("DICIEMBRE");

    // create chart
    let ctx = document.getElementById("myChart").getContext("2d");
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
              report[eneroIndex].total_cargos
                ? report[eneroIndex].total_cargos
                : 0,
              report[febreroIndex].total_cargos
                ? report[febreroIndex].total_cargos
                : 0,
              report[marzoIndex].total_cargos
                ? report[marzoIndex].total_cargos
                : 0,
              report[abrilIndex].total_cargos
                ? report[abrilIndex].total_cargos
                : 0,
              report[mayoIndex].total_cargos
                ? report[mayoIndex].total_cargos
                : 0,
              report[junioIndex].total_cargos
                ? report[junioIndex].total_cargos
                : 0,
              report[julioIndex].total_cargos
                ? report[julioIndex].total_cargos
                : 0,
              report[agostoIndex].total_cargos
                ? report[agostoIndex].total_cargos
                : 0,
              report[septiembreIndex].total_cargos
                ? report[septiembreIndex].total_cargos
                : 0,
              report[octubreIndex].total_cargos
                ? report[octubreIndex].total_cargos
                : 0,
              report[noviembreIndex].total_cargos
                ? report[noviembreIndex].total_cargos
                : 0,
              report[diciembreIndex].total_cargos
                ? report[diciembreIndex].total_cargos
                : 0
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

  useEffect(() => {
    let auditId = audit.auditId;
    let cuentaContable = props.cuenta;
    API.report_Amdg_cuenta({ auditId, cuentaContable })
      .then(res => {
        setChart(res.data);
        generateChart(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return chart.length ? (
    <React.Fragment>
      <h5>
        <small className="text-muted mr-2">Cuenta:</small>
        {props.cuenta.cuentaContable}
      </h5>
      <h5>
        <small className="text-muted mr-2">Descripción:</small>
        {props.cuenta.cuentaDescripción}
      </h5>
      <h5>
        <small className="text-muted mr-2">Total cargos:</small>
        {formatNumber(props.cuenta.total_cargos)}
      </h5>
      <canvas id="myChart" className="w-100" />
    </React.Fragment>
  ) : (
    <div className="text-center mt-4 pt-4">
      <Spinner animation="border" />
    </div>
  );
});

AmdgChart.propTypes = {
  cuenta: PropTypes.object.isRequired
};

export default AmdgChart;

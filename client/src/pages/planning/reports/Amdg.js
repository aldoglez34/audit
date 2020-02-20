import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useSelector } from "react-redux";
import API from "../../../utils/API";
import Chart from "chart.js";

const Amdg = React.memo(function Amdg() {
  const audit = useSelector(state => state.audit);

  const [monthlyReport, setMonthlyReport] = useState([]);

  const generateChart = report => {
    console.log(report);

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
              report[eneroIndex].total_cargos,
              report[febreroIndex].total_cargos,
              report[marzoIndex].total_cargos,
              report[abrilIndex].total_cargos,
              report[mayoIndex].total_cargos,
              report[junioIndex].total_cargos,
              report[julioIndex].total_cargos,
              report[agostoIndex].total_cargos,
              report[septiembreIndex].total_cargos,
              report[octubreIndex].total_cargos,
              report[noviembreIndex].total_cargos,
              report[diciembreIndex].total_cargos
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
        // title: {
        //   display: true,
        //   text: "Análisis mensual de gastos"
        // },
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
    API.reportAmdg()
      .then(res => {
        setMonthlyReport(res.data);
        generateChart(res.data);
      })
      .catch(err => console.log(err));
    //
  }, []);

  return (
    <Layout
      auditMenu="Planeación"
      backButton={"/audit/planning/" + audit.auditId + "/reportes"}
    >
      {/* title */}
      <div className="d-flex flex-row">
        <div>
          <h2>Análisis mensual de gastos</h2>
          <hr className="myDivider" />
        </div>
      </div>
      {/* content */}
      <div className="bg-white rounded p-4">
        <canvas id="myChart" />
      </div>
    </Layout>
  );
});

export default Amdg;

import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useSelector } from "react-redux";
import API from "../../../utils/API";

const Report = React.memo(function Report(props) {
  const audit = useSelector(state => state.audit);

  const [title, setTitle] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    API.reportAmdg()
      .then(res => {
        console.log(res);
        setReport(res.data);
      })
      .catch(err => console.log(err));

    // report title
    let title = props.routeProps.match.params.reportTitle;
    switch (title) {
      case "amdg":
        setTitle("Análisis mensual de gastos");
        break;
      case "sdg":
        setTitle("Sumaria de gastos");
        break;
      case "sdi":
        setTitle("Sumaria de ingresos");
        break;
      case "amdm":
        setTitle("Análisis mensual de movimientos");
        break;
      case "csdsc":
        setTitle("Cédula sumaria de saldos comparativos");
        break;
      default:
      // code block
    }
  }, []);

  return (
    <Layout
      auditMenu="Planeación"
      backButton={"/audit/planning/" + audit.auditId + "/reportes"}
    >
      {/* title */}
      <div className="d-flex flex-row">
        <div>
          <h2>{title}</h2>
          <hr className="myDivider" />
        </div>
      </div>
      {/* content */}
    </Layout>
  );
});

export default Report;

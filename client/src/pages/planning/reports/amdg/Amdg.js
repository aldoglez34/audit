import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useSelector } from "react-redux";
import API from "../../../../utils/API";
import AmdgTop from "./components/AmdgTop";
import { Spinner } from "react-bootstrap";

const Amdg = React.memo(function Amdg() {
  const audit = useSelector(state => state.audit);

  const [top, setTop] = useState([]);

  useEffect(() => {
    API.report_Amdg_topCuentas()
      .then(res => setTop(res.data))
      .catch(err => console.log(err));
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
      <span className="lead">
        A continuación se muestran las 10 cuentas de gastos con un mayor total
        de cargos en orden descendente
      </span>
      <div className="mt-4">
        {top.length ? (
          <AmdgTop top={top} />
        ) : (
          <div className="text-center mt-4 pt-4">
            <Spinner animation="border" />
          </div>
        )}
      </div>
    </Layout>
  );
});

export default Amdg;

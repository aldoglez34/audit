import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import API from "../../../../../utils/API";
import { Spinner } from "react-bootstrap";
import Chart from "chart.js";

const AmdgChart = React.memo(function AmdgChart(props) {
  const audit = useSelector(state => state.audit);

  const [chart, setChart] = useState(["asdasd"]);

  const formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  useEffect(() => {
    console.log("@amdgChart - useEffect");
    let auditId = audit.auditId;
    let cuentaContable = props.cuenta.cuentaContable;
    API.report_Amdg_cuenta({ auditId, cuentaContable })
      .then(res => {
        console.log("@chart", res.data);
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

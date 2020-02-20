import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import API from "../../../../../utils/API";

const AmdgChart = React.memo(function AmdgChart(props) {
  const audit = useSelector(state => state.audit);

  const [chart, setChart] = useState([]);

  useEffect(() => {
    let auditId = audit.auditId;
    let cuentaContable = props.cuentaContable;
    API.report_Amdg_cuenta({ auditId, cuentaContable })
      .then(res => {
        setChart(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <h2>{props.cuentaContable}</h2>
      <span>{chart.toString()}</span>
    </React.Fragment>
  );
});

AmdgChart.propTypes = {
  cuentaContable: PropTypes.string.isRequired
};

export default AmdgChart;

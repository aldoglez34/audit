import React from "react";
import { useSelector } from "react-redux";

const Surveys = React.memo(function Surveys() {
  const audit = useSelector(state => state.audit);

  return (
    <ul className="list-unstyled">
      <li>
        <ul>
          <li>
            <a href={"/audit/planning/cci/" + audit.auditId}>
              Cuestionario de Control Interno
            </a>
          </li>
          <li>
            <a href={"/audit/planning/cefs/" + audit.auditId}>
              Cédula de Estados Financieros del Sistema
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
});

export default Surveys;

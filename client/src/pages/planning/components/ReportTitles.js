import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const ReportTitles = React.memo(function ReportTitles() {
  const audit = useSelector(state => state.audit);

  return (
    <div className="bg-white rounded-bottom p-3 border border-top-0">
      <div className="text-center mt-4">
        <Image src="/images/business.png" />
      </div>
      <h5 className="text-center mt-3">Reportes para la fase de Planeación</h5>
      <ol className="mt-4">
        <li>
          <a href={"/audit/planning/report/ads/" + audit.auditId}>
            Análisis de saldos
          </a>
        </li>
        {/* <li>
          <a href={"/audit/planning/report/amdg/" + audit.auditId}>
            Análisis mensual de gastos
          </a>
        </li>
        <li>
          <a href={"/audit/planning/report/amdg/" + audit.auditId}>
            Sumaria de gastos
          </a>
        </li>
        <li>
          <a href={"/audit/planning/report/amdg/" + audit.auditId}>
            Sumaria de ingresos
          </a>
        </li>
        <li>
          <a href={"/audit/planning/report/amdg/" + audit.auditId}>
            Análisis mensual de movimientos
          </a>
        </li>
        <li>
          <a href={"/audit/planning/report/amdg/" + audit.auditId}>
            Cédula sumaria de saldos comparativos
          </a>
        </li> */}
      </ol>
    </div>
  );
});

export default ReportTitles;

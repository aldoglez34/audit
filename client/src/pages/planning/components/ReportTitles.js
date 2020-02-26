import React from "react";
import { Image } from "react-bootstrap";

const ReportTitles = React.memo(function ReportTitles() {
  return (
    <div className="bg-white rounded-bottom p-3 border border-top-0">
      <div className="text-center mt-4">
        <Image src="/images/business.png" />
      </div>
      <h5 className="text-center mt-3">Reportes para la fase de Planeación</h5>
      <ol className="mt-4">
        <li>
          <a href={"/audit/planning/report/ads"}>Análisis de saldos</a>
        </li>
        <li>
          <a href={"/audit/planning/report/csdsc"}>
            Cédula sumaria de saldos comparativos
          </a>
        </li>
        <li>
          <a href={"/audit/planning/report/amds"}>Análisis mensual de saldos</a>
        </li>
      </ol>
    </div>
  );
});

export default ReportTitles;

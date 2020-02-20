import React from "react";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";

const Reports = React.memo(function Reports(props) {
  const audit = useSelector(state => state.audit);

  return (
    <div className="bg-white rounded-bottom p-3 border border-top-0">
      <div className="text-center mt-4">
        <Image src="/images/business.png" />
      </div>
      <h5 className="text-center mt-3">Reportes para la fase de Planeación</h5>
      <ul className="mt-4">
        <li>
          <a href="#">Análisis mensual de gastos</a>
        </li>
        <li>
          <a href="#">Sumaria de gastos</a>
        </li>
        <li>
          <a href="#">Sumaria de ingresos</a>
        </li>
        <li>
          <a href="#">Análisis mensual de movimientos</a>
        </li>
        <li>
          <a href="#">Cédula sumaria de saldos comparativos</a>
        </li>
      </ul>
    </div>
  );
});

export default Reports;

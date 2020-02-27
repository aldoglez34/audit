import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useSelector } from "react-redux";
import API from "../../../../utils/API";
import { Table, Spinner } from "react-bootstrap";
import ReportTitle from "../components/ReportTitle";

const Csdsc = React.memo(function Csdsc() {
  const audit = useSelector(state => state.audit);

  const [report, setReport] = useState([]);

  useEffect(() => {
    API.balanzaReport_csdsc(audit.clientId, audit.year)
      .then(res => {
        setReport(res.data);
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.msg);
      });
  }, []);

  return (
    <Layout auditMenu="Planeación" backButton={"/audit/planning/reportes"}>
      {/* title */}
      <ReportTitle
        title="Cédula sumaria de saldos comparativos"
        description="Comparativo de saldos de balanza al 31 de diciembre del ejercicio de
        revisón con los saldos al 31 de diciembre del año anterior"
      />
      <br />
      {/* content */}
      {report.length ? (
        <>
          <h4 className="mb-3">Resumen por cuenta</h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr
                style={{
                  backgroundColor: "rgb(62, 67, 74)",
                  color: "ghostwhite"
                }}
              >
                <th className="text-center" style={{ fontWeight: "500" }}>
                  CuentaContable
                </th>
                <th className="text-center" style={{ fontWeight: "500" }}>
                  CuentaDescripción
                </th>
                <th className="text-center" style={{ fontWeight: "500" }}>
                  {audit.year}
                </th>
                <th className="text-center" style={{ fontWeight: "500" }}>
                  {audit.year - 1}
                </th>
                <th className="text-center" style={{ fontWeight: "500" }}>
                  VariaciónImporte
                </th>
                <th className="text-center" style={{ fontWeight: "500" }}>
                  VariaciónPorcentaje
                </th>
              </tr>
            </thead>
            <tbody>
              {report.map(cu => {
                return (
                  <tr key={cu.cuentaContable}>
                    <td>{cu.cuentaContable}</td>
                    <td>{cu.cuentaDescripción}</td>
                    <td className="text-right">
                      {cu[audit.year + "_totalSaldoFinal"]}
                    </td>
                    <td className="text-right">
                      {cu[audit.year - 1 + "_totalSaldoFinal"]}
                    </td>
                    <td className="text-right">{cu.variaciónImporte}</td>
                    <td className="text-right">{cu.variaciónPorcentaje}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <div className="text-center mt-4 pt-4">
          <Spinner animation="border" />
        </div>
      )}
    </Layout>
  );
});

export default Csdsc;

import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useSelector } from "react-redux";
import HelpTooltip from "../../components/HelpTooltip";
import API from "../../../../utils/API";
import { Table, Spinner } from "react-bootstrap";

const Csdsc = React.memo(function Csdsc() {
  const formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const audit = useSelector(state => state.audit);

  const [cuentas, setCuentas] = useState([]);
  const [report, setReport] = useState([]);

  useEffect(() => {
    API.balanzaReport_csdsc(audit.clientId, audit.year)
      .then(res => {
        console.log("@res.data", res.data);
        setCuentas(res.data.cuentas);
        setReport(res.data.report);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout auditMenu="Planeación" backButton={"/audit/planning/reportes"}>
      {/* title */}
      <div className="d-flex flex-row">
        <div>
          <h2>Cédula sumaria de saldos comparativos</h2>
          <hr className="myDivider" />
        </div>
        <div className="ml-auto d-flex align-items-center">
          <HelpTooltip
            title="Cédula sumaria de saldos comparativos"
            text="Descripción del reporte"
          />
        </div>
      </div>
      {/* content */}
      {/* {cuentas.length && report.length ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>CuentaContable</th>
              <th>CuentaDescripción</th>
              <th>{audit.year - 1}</th>
              <th>{audit.year}</th>
            </tr>
          </thead>
          <tbody>
            {cuentas.map(cu => {
              return (
                <tr key={cu.cuentaContable}>
                  <td>{cu.cuentaContable}</td>
                  <td>{cu.cuentaDescripción}</td>
                  {report.map(rep => {
                    return rep.cuentaContable === cu.cuentaContable &&
                      rep.year === audit.year - 1 ? (
                      <td key={rep.cuentaContable}>
                        {formatNumber(rep.total_saldoFinal)}
                      </td>
                    ) : null;
                  })}
                  {report.map(rep => {
                    return rep.cuentaContable === cu.cuentaContable &&
                      rep.year === audit.year ? (
                      <td key={rep.cuentaContable}>
                        {formatNumber(rep.total_saldoFinal)}
                      </td>
                    ) : null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div className="text-center mt-4 pt-4">
          <Spinner animation="border" />
        </div>
      )} */}
    </Layout>
  );
});

export default Csdsc;

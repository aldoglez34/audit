import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useSelector } from "react-redux";
import HelpTooltip from "../../components/HelpTooltip";
import API from "../../../../utils/API";
import { Table, Spinner } from "react-bootstrap";

const Ads = React.memo(function Ads() {
  const formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const audit = useSelector(state => state.audit);

  const [rubros, setRubros] = useState([]);
  const [report, setReport] = useState([]);

  useEffect(() => {
    API.balanzaReport_ads(audit.auditId)
      .then(res => {
        setRubros(res.data.rubros);
        setReport(res.data.report);
      })
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
          <h2>Análisis de saldos</h2>
          <hr className="myDivider" />
        </div>
        <div className="ml-auto d-flex align-items-center">
          <HelpTooltip
            title="Análisis de saldos"
            text="Sólo diciembre, agrupado por rubro, cuenta, descripción de de cuenta y suma de saldo final."
          />
        </div>
      </div>
      {/* content */}
      <section className="mt-3">
        {rubros.length && report.length ? (
          rubros.map(rub => {
            return (
              <React.Fragment key={rub.rubro}>
                <h5>{rub.rubro}</h5>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>CuentaContable</th>
                      <th>CuentaDescripción</th>
                      <th>SaldoFinal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map(rep => {
                      return rep.rubro === rub.rubro ? (
                        <tr key={rep.cuentaContable}>
                          <td>{rep.cuentaContable}</td>
                          <td>{rep.cuentaDescripción}</td>
                          <td>{formatNumber(rep.total_saldoFinal)}</td>
                        </tr>
                      ) : null;
                    })}
                  </tbody>
                </Table>
              </React.Fragment>
            );
          })
        ) : (
          <div className="text-center mt-4 pt-4">
            <Spinner animation="border" />
          </div>
        )}
      </section>
    </Layout>
  );
});

export default Ads;

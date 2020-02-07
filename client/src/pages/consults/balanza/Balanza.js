import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useSelector } from "react-redux";
import API from "../../../utils/API";
import { Table, Spinner } from "react-bootstrap";
import LoadBalanza from "./components/LoadBalanza";

const Balanza = React.memo(function Balanza() {
  const audit = useSelector(state => state.audit);

  const [balanza, setBalanza] = useState();

  useEffect(() => {
    if (audit.hasBalanza)
      API.fetchBalanza(audit.auditId)
        .then(res => setBalanza(res.data))
        .catch(err => console.log(err));
  }, []);

  return (
    <Layout auditMenu="Balanza" auditOpened="SOMETHING">
      <h2>Balanza</h2>
      <hr className="myDivider" />
      {!audit.hasBalanza ? (
        <LoadBalanza />
      ) : (
        <div>
          {balanza ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>CuentaContable</th>
                  <th>CuentaDescripción</th>
                  <th>SaldoInicial</th>
                  <th>Cargos</th>
                  <th>Abonos</th>
                  <th>SaldoFinal</th>
                </tr>
              </thead>
              <tbody>
                {balanza.map(b => {
                  return (
                    <tr key={b.balanzaId}>
                      <td>{b.month}</td>
                      <td>{b.cuentaContable}</td>
                      <td>{b.cuentaDescripción}</td>
                      <td>{b.saldoInicial}</td>
                      <td>{b.cargos}</td>
                      <td>{b.abonos}</td>
                      <td>{b.saldoFinal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="text-center mt-4 pt-4">
              <Spinner animation="border" />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
});

export default Balanza;

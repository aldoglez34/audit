import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useSelector } from "react-redux";
import API from "../../../../utils/API";
import { Table, Spinner, Row, Col, ListGroup } from "react-bootstrap";
import ReportTitle from "../components/ReportTitle";

const Csdsc = React.memo(function Csdsc() {
  const audit = useSelector(state => state.audit);

  const [report, setReport] = useState([]);
  const [destacadas, setDestacadas] = useState([]);

  useEffect(() => {
    API.balanzaReport_csdsc(audit.clientId, audit.year)
      .then(res => {
        console.log(res.data);
        setReport(res.data.report);
        setDestacadas(res.data.destacadas);
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
      {report.length && destacadas.length ? (
        <React.Fragment>
          <section className="mb-4">
            <Row>
              <Col>
                <h4>Destacadas</h4>
                <ListGroup
                  defaultActiveKey={"#" + destacadas[0].cuentaContable}
                >
                  {destacadas.map(des => {
                    return (
                      <ListGroup.Item
                        action
                        href={"#" + des.cuentaContable}
                        onClick={() => {
                          alert("seleccionaste: " + des.cuentaContable);
                        }}
                        className="d-flex flex-column"
                        key={des.cuentaContable}
                      >
                        <strong>{des.cuentaContable}</strong>
                        <span>{des.cuentaDescripción}</span>
                        <span>{des.total_cargos}</span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
              <Col>
                <h4>Gráfica</h4>
                <ListGroup>
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </section>
          <section>
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
                  return destacadas
                    .map(des => des.cuentaContable)
                    .indexOf(cu.cuentaContable) === -1 ? (
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
                  ) : (
                    <tr key={cu.cuentaContable}>
                      <td>
                        <strong className="text-danger">
                          {cu.cuentaContable}
                        </strong>
                      </td>
                      <td>
                        <strong className="text-danger">
                          {cu.cuentaDescripción}
                        </strong>
                      </td>
                      <td className="text-right text-danger">
                        <strong>{cu[audit.year + "_totalSaldoFinal"]}</strong>
                      </td>
                      <td className="text-right text-danger">
                        <strong>
                          {cu[audit.year - 1 + "_totalSaldoFinal"]}
                        </strong>
                      </td>
                      <td className="text-right text-danger">
                        <strong>{cu.variaciónImporte}</strong>
                      </td>
                      <td className="text-right text-danger">
                        <strong>{cu.variaciónPorcentaje}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        </React.Fragment>
      ) : (
        <div className="text-center mt-4 pt-4">
          <Spinner animation="border" />
        </div>
      )}
    </Layout>
  );
});

export default Csdsc;

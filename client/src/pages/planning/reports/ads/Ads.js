import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useSelector } from "react-redux";
import API from "../../../../utils/API";
import {
  Alert,
  Image,
  Table,
  Spinner,
  ListGroup,
  Row,
  Col
} from "react-bootstrap";

const Ads = React.memo(function Ads() {
  const formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const audit = useSelector(state => state.audit);

  const [destacadas, setDestacadas] = useState([]);
  const [totalRubros, setTotalRubros] = useState([]);
  const [report, setReport] = useState([]);

  useEffect(() => {
    API.balanzaReport_ads(audit.auditId)
      .then(res => {
        console.log(res.data);
        setDestacadas(res.data.destacadas);
        setTotalRubros(res.data.totalRubros);
        setReport(res.data.report);
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.msg);
      });
  }, []);

  return (
    <Layout auditMenu="Planeación" backButton={"/audit/planning/reportes"}>
      {/* title */}
      <h2>Análisis de saldos</h2>
      <hr className="myDivider" />
      <br />
      <Alert variant="info" style={{ fontSize: "18px" }}>
        <Image
          src="/images/warning.png"
          width="45px"
          height="45px"
          className="mr-3"
        />
        Con datos de la balanza analizar por rubro los saldos al cierre del
        ejercicio
      </Alert>
      <br />
      {/* content */}
      {report.length && destacadas.length && totalRubros.length ? (
        <>
          <Row>
            {/* destacadas */}
            <Col>
              <h4 className="mb-3">Cuentas destacadas</h4>
              <ListGroup className="mb-4">
                {destacadas.map(des => {
                  return (
                    <ListGroup.Item
                      key={des.cuentaContable}
                      className="d-flex flex-column"
                    >
                      <strong>{des.cuentaContable}</strong>
                      <span>{des.cuentaDescripción}</span>
                      <span>{des.rubro}</span>
                      <span>{"$ " + formatNumber(des.total_saldoFinal)}</span>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
            {/* total rubros */}
            <Col>
              <h4 className="mb-3">Totales rubros</h4>
              <ListGroup className="mb-4">
                {totalRubros.map(tr => {
                  return (
                    <ListGroup.Item
                      key={tr.rubro}
                      className="d-flex flex-column"
                    >
                      <strong>{tr.rubro}</strong>
                      <span>{"$ " + formatNumber(tr.total_saldoFinal)}</span>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
          {/* resumen por rubro */}
          <Row>
            <Col>
              <h4 className="mb-3">Resumen por rubro</h4>
              <Table striped bordered hover size="sm" className="rounded">
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgb(44, 47, 51)",
                      color: "rgb(153, 170, 181)"
                    }}
                  >
                    <th className="text-center">Rubro</th>
                    <th className="text-center">CuentaContable</th>
                    <th className="text-center">CuentaDescripción</th>
                    <th className="text-center">SaldoFinal</th>
                    <th className="text-center">SaldoFinal</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map(rep => {
                    return (
                      <tr key={rep.cuentaContable}>
                        <td>{rep.rubro}</td>
                        <td>{rep.cuentaContable}</td>
                        <td>{rep.cuentaDescripción}</td>
                        <td className="text-right">
                          {formatNumber(rep.total_saldoFinal)}
                        </td>
                        <td className="text-center">0%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center mt-4 pt-4">
          <Spinner animation="border" />
        </div>
      )}
    </Layout>
  );
});

export default Ads;

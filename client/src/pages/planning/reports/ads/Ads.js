import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useSelector } from "react-redux";
import API from "../../../../utils/API";
import ReportTitle from "../components/ReportTitle";
import { Table, Spinner, ListGroup, Row, Col } from "react-bootstrap";

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
        setDestacadas(res.data.destacadas);
        setTotalRubros(res.data.totalRubros);
        setReport(res.data.report);
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.msg);
      });
  }, []);

  const calculatePercentage = ({ saldoFinal, rubro }) => {
    // get the total of that rubro
    let totalRubro = totalRubros.filter(tr => tr.rubro === rubro)[0]
      .total_saldoFinal;

    let percentage = saldoFinal / totalRubro;

    return isNaN(percentage)
      ? ""
      : percentage
          .toFixed(2)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "%";
  };

  return (
    <Layout auditMenu="Planeación" backButton={"/audit/planning/reportes"}>
      {/* title */}
      <ReportTitle
        title="Análisis de saldos"
        description="Con datos de la balanza analizar por rubro los saldos al cierre del
        ejercicio"
      />
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
              <Table striped bordered hover size="sm">
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgb(62, 67, 74)",
                      color: "ghostwhite"
                    }}
                  >
                    <th className="text-center" style={{ fontWeight: "500" }}>
                      Rubro
                    </th>
                    <th className="text-center" style={{ fontWeight: "500" }}>
                      CuentaContable
                    </th>
                    <th className="text-center" style={{ fontWeight: "500" }}>
                      CuentaDescripción
                    </th>
                    <th className="text-center" style={{ fontWeight: "500" }}>
                      SaldoFinal
                    </th>
                    <th className="text-center" style={{ fontWeight: "500" }}>
                      Porcentaje
                    </th>
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
                        <td className="text-center">
                          {calculatePercentage({
                            saldoFinal: rep.total_saldoFinal,
                            rubro: rep.rubro
                          })}
                        </td>
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

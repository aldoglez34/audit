import React, { useState, useEffect } from "react";
import { Row, Col, Tab, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import AmdgChart from "./AmdgChart";

const AmdgTop = React.memo(function AmdgTop(props) {
  const formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const [cuenta, setCuenta] = useState("");

  useEffect(() => {
    setCuenta(props.top[0].cuentaContable);
  }, []);

  return (
    <React.Fragment>
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey={"#" + props.top[0].cuentaContable}
      >
        <Row>
          <Col sm={4}>
            <ListGroup>
              {props.top.map(c => {
                return (
                  <ListGroup.Item
                    action
                    className="d-flex flex-column"
                    href={"#" + c.cuentaContable}
                    key={c.cuentaContable}
                    onClick={() => setCuenta(c.cuentaContable)}
                  >
                    <strong>{c.cuentaContable}</strong>
                    <span>{c.cuentaDescripción}</span>
                    <span>{formatNumber(c.total_cargos)}</span>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {props.top.map(c => {
                return (
                  <Tab.Pane
                    key={c.cuentaContable}
                    eventKey={"#" + c.cuentaContable}
                  >
                    <AmdgChart cuenta={c} cuenta={cuenta} />
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
});

AmdgTop.propTypes = {
  top: PropTypes.array.isRequired
};

export default AmdgTop;

import React from "react";
import { Row, Col, Tab, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import AmdgChart from "./AmdgChart";

const AmdgTop15 = React.memo(function AmdgTop15(props) {
  const formatNumber = num => {
    return num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <React.Fragment>
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey={"#" + props.top15[0].cuentaContable}
      >
        <Row>
          <Col sm={4}>
            <ListGroup>
              {props.top15.map(c => {
                return (
                  <ListGroup.Item
                    action
                    className="d-flex flex-column"
                    href={"#" + c.cuentaContable}
                    key={c.cuentaContable}
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
              {props.top15.map(c => {
                return (
                  <Tab.Pane
                    key={c.cuentaContable}
                    eventKey={"#" + c.cuentaContable}
                  >
                    <AmdgChart cuentaContable={c.cuentaContable} />
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

AmdgTop15.propTypes = {
  top15: PropTypes.array.isRequired
};

export default AmdgTop15;

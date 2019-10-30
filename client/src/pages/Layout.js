import React from "react";
import MyNavbar from "../components/MyNavbar";
import { Container, Row, Col } from "react-bootstrap";

const Layout = props => (
  <div className="d-lg-flex flex-row h-100">
    <MyNavbar />
    <Container className="p-4" id="mainContainer" fluid>
      <Row>
        <Col className="pt-2 pb-4">{props.children}</Col>
      </Row>
    </Container>
  </div>
);

export default Layout;

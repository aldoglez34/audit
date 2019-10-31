import React from "react";
import AllNavs from "../components/AllNavs";
import { Container, Row, Col } from "react-bootstrap";
import TopHelperNav from "../components/TopHelperNav";

const Layout = props => (
  <div className="d-lg-flex flex-row h-100">
    <AllNavs />
    <Container id="containerMargin" fluid>
      <TopHelperNav />
      <Container
        style={{
          paddingTop: "6px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "24px"
        }}
        fluid
      >
        <Row>
          <Col className="pt-2 pb-4">{props.children}</Col>
        </Row>
      </Container>
    </Container>
  </div>
);

export default Layout;

import React from "react";
import LeftNav from "../components/navs/LeftNav";
import { Container, Row, Col } from "react-bootstrap";
import TopHelperNav from "../components/navs/TopHelperNav";
import PropTypes from "prop-types";

Layout.propTypes = {
  children: PropTypes.array.isRequired,
  homeMenu: PropTypes.string,
  auditMenu: PropTypes.string,
  auditOpened: PropTypes.string
};

function Layout(props) {
  return (
    <div className="d-lg-flex flex-row h-100">
      <LeftNav homeMenu={props.homeMenu} auditMenu={props.auditMenu} />
      <Container id="containerMargin" fluid>
        <TopHelperNav
          auditOpened={props.auditOpened}
          backButton={props.backButton}
        />
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
}

export default Layout;

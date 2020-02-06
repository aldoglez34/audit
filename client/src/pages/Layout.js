import React from "react";
import LeftNav from "../components/navs/LeftNav";
import { Container } from "react-bootstrap";
import TopHelperNav from "../components/navs/TopHelperNav";
import PropTypes from "prop-types";

const Layout = React.memo(function Layout(props) {
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
            paddingTop: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "24px"
          }}
          fluid
        >
          {props.children}
        </Container>
      </Container>
    </div>
  );
});

Layout.propTypes = {
  children: PropTypes.array.isRequired,
  homeMenu: PropTypes.string,
  auditMenu: PropTypes.string,
  auditOpened: PropTypes.string
};

export default Layout;

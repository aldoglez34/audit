import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Col, Button } from "react-bootstrap";
import UserDropdown from "../UserDropdown";

const TopHelperNav = React.memo(function TopHelperNav(props) {
  const user = useSelector(state => state.user);
  const audit = useSelector(state => state.audit);

  return (
    <div>
      <Navbar style={{ backgroundColor: "#2c2f33", height: "60px" }}>
        <Col className="d-flex justify-content-start">
          {props.backButton ? (
            <Button
              variant="transparent"
              href={props.backButton}
              className="p-0"
            >
              <i className="fas fa-chevron-left backArrow" />
            </Button>
          ) : null}
        </Col>
        <Col className="d-flex justify-content-center">
          {audit.name ? (
            <Nav.Item style={{ color: "#7289da" }}>
              <i className="fas fa-project-diagram mr-2" />
              <strong>{audit.name}</strong>
            </Nav.Item>
          ) : null}
        </Col>
        <Col className="d-flex flex-row justify-content-end align-items-center">
          <Nav.Item>
            <UserDropdown />
          </Nav.Item>
          <Nav.Item style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <i className="fas fa-shield-alt mr-2" />
            {user.role}
          </Nav.Item>
        </Col>
      </Navbar>
    </div>
  );
});

export default TopHelperNav;

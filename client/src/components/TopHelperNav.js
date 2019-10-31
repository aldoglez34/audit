import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import "./tophelpernav.scss";

function TopHelperNav() {
  const user = useSelector(state => state.user);
  const audit = useSelector(state => state.audit);

  return (
    <div className="d-none d-md-block">
      <Navbar id="topHelperStyle">
        <Nav className="mr-auto">
          {audit.isOpen ? (
            <Nav.Item className="topHelperAuditOpened mr-auto">
              <i className="fas fa-project-diagram mr-2" />
              {audit.name}
            </Nav.Item>
          ) : null}
        </Nav>
        <Nav>
          <Nav.Item className="topHelperItem">
            <i className="fas fa-user mr-2" />
            {user.name + " " + user.firstSurname}
          </Nav.Item>
          <Nav.Item className="topHelperItem">
            <i className="fas fa-shield-alt mr-2" />
            {user.role}
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default TopHelperNav;

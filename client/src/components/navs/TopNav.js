import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Button } from "react-bootstrap";
import * as auditActions from "../../redux/actions/auditActions";
import fire from "../../firebase/Fire";
import "./topnav.scss";

function LeftNav() {
  const user = useSelector(state => state.user);
  const navbar = useSelector(state => state.navbar);
  const audit = useSelector(state => state.audit);

  const dispatch = useDispatch();

  const logout = () => {
    // sign out of session
    fire.auth().signOut();
    // close audit
    dispatch(auditActions.closeAudit());
  };

  return (
    <Navbar
      id="navbarStyle"
      variant="dark"
      className="d-flex d-lg-none"
      expand="lg"
      collapseOnSelect
    >
      <Navbar.Brand id="navbarLogo">APAG</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {navbar.homeMenu.show ? (
          <section>
            <Nav className="mr-auto">
              <Navbar.Text className="navbarItemStyle">
                <small>MENÚ</small>
              </Navbar.Text>
              <Nav.Link
                href="/audits"
                className="navbarLinkStyle"
                active={navbar.homeMenu.active === "Auditorías" ? true : false}
              >
                <i className="fas fa-project-diagram mr-2" />
                Auditorías
              </Nav.Link>
              <Nav.Link
                href="/clients"
                className="navbarLinkStyle"
                active={navbar.homeMenu.active === "Clientes" ? true : false}
              >
                <i className="fas fa-user-friends mr-2" />
                Clientes
              </Nav.Link>
              {/* if there's an audit opened, the exit button is sending the user to the audits page */}
              <Button className="mb-2 mt-3" variant="danger" onClick={logout}>
                Salir
              </Button>
            </Nav>
          </section>
        ) : null}
        {navbar.auditMenu.show && audit.isOpen ? (
          <section>
            <Nav className="mr-auto">
              <Nav.Item className="navbarItemStyle">
                <small>{user.name + " " + user.firstSurname}</small>
              </Nav.Item>
              <Nav.Item className="navbarItemStyle">
                <small>{user.role}</small>
              </Nav.Item>
              <Nav.Item className="navbarItemStyle">
                <small>{user.email}</small>
              </Nav.Item>
              <Navbar.Text className="navbarItemStyle">
                <small>MENÚ</small>
              </Navbar.Text>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/home/" + audit.auditId}
                active={navbar.auditMenu.active === "Inicio" ? true : false}
              >
                <i className="fas fa-home mr-2" />
                Inicio
              </Nav.Link>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/details/" + audit.auditId}
                active={navbar.auditMenu.active === "Detalles" ? true : false}
              >
                <i className="fas fa-info-circle mr-2" />
                Detalles
              </Nav.Link>
              <Navbar.Text className="navbarItemStyle">
                <small>FASES</small>
              </Navbar.Text>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/planning/" + audit.auditId}
                active={navbar.auditMenu.active === "Planeación" ? true : false}
              >
                <i className="fas fa-tasks mr-2" />
                Planeación
              </Nav.Link>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/execution/" + audit.auditId}
                active={navbar.auditMenu.active === "Ejecución" ? true : false}
              >
                <i className="fas fa-chess mr-2" />
                Ejecución
              </Nav.Link>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/reporting/" + audit.auditId}
                active={navbar.auditMenu.active === "Informes" ? true : false}
              >
                <i className="fas fa-folder-open mr-2" />
                Informes
              </Nav.Link>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/followup/" + audit.auditId}
                active={
                  navbar.auditMenu.active === "Seguimiento" ? true : false
                }
              >
                <i className="fas fa-flag mr-2" />
                Seguimiento
              </Nav.Link>
              <Navbar.Text className="navbarItemStyle">
                <small>CONSULTAR</small>
              </Navbar.Text>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/nómina/" + audit.auditId}
                active={navbar.auditMenu.active === "Nómina" ? true : false}
              >
                <i className="far fa-file-alt mr-2" />
                Nómina
              </Nav.Link>
              <Nav.Link
                className="navbarLinkStyle"
                href={"/audit/balanza/" + audit.auditId}
                active={navbar.auditMenu.active === "Balanza" ? true : false}
              >
                <i className="far fa-file-alt mr-2" />
                Balanza
              </Nav.Link>
              {/* if there's an audit opened, the exit button is sending the user to the audits page */}
              <Button className="mb-2 mt-3" variant="danger" href="/audits">
                Salir
              </Button>
            </Nav>
          </section>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}
export default LeftNav;

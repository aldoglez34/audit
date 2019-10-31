import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Nav, Navbar } from "react-bootstrap";
import fire from "../firebase/Fire";
import "./mynavbar.scss";
import * as auditActions from "../redux-actions/auditActions";

function MyNavbar() {
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
    <>
      {/* VERTICAL navbar */}
      <Nav className="d-none d-lg-flex flex-column h-100" id="verticalNavStyle">
        <Nav.Item id="verticalNavLogo">APAG</Nav.Item>
        {/* HOME menu */}
        {navbar.homeMenu.show ? (
          <>
            <Nav.Item className="mt-2 mb-1" style={{ color: "gray" }}>
              <small>MENÚ</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href="/audits"
              active={navbar.homeMenu.active === "Auditorías" ? true : false}
            >
              <i className="fas fa-project-diagram" style={{ width: "32px" }} />
              Auditorías
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href="/clients"
              active={navbar.homeMenu.active === "Clientes" ? true : false}
            >
              <i className="fas fa-user-friends" style={{ width: "32px" }} />
              Clientes
            </Nav.Link>
            {/* if there's no audit opened, the exit button is gonna end user session */}
            <Button
              className="shadow-sm mt-auto"
              variant="danger"
              block
              onClick={logout}
            >
              Salir
            </Button>
          </>
        ) : null}
        {/* AUDIT menu */}
        {navbar.auditMenu.show && audit.isOpen ? (
          <>
            <Nav.Item className="my-2 pl-3" style={{ color: "gray" }}>
              <small>MENÚ</small>
            </Nav.Item>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/home/" + audit.auditId}
              active={navbar.auditMenu.active === "Inicio" ? true : false}
            >
              <i className="fas fa-home" style={{ width: "32px" }} />
              Inicio
            </Nav.Link>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/details/" + audit.auditId}
              active={navbar.auditMenu.active === "Detalles" ? true : false}
            >
              <i className="fas fa-info-circle" style={{ width: "32px" }} />
              Detalles
            </Nav.Link>
            <Nav.Item className="my-2 pl-3" style={{ color: "gray" }}>
              <small>FASES</small>
            </Nav.Item>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/planning/" + audit.auditId}
              active={navbar.auditMenu.active === "Planeación" ? true : false}
            >
              <i className="fas fa-tasks" style={{ width: "32px" }} />
              Planeación
            </Nav.Link>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/execution/" + audit.auditId}
              active={navbar.auditMenu.active === "Ejecución" ? true : false}
            >
              <i className="fas fa-chess" style={{ width: "32px" }} />
              Ejecución
            </Nav.Link>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/reporting/" + audit.auditId}
              active={navbar.auditMenu.active === "Informes" ? true : false}
            >
              <i className="fas fa-folder-open" style={{ width: "32px" }} />
              Informes
            </Nav.Link>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/followup/" + audit.auditId}
              active={navbar.auditMenu.active === "Seguimiento" ? true : false}
            >
              <i className="fas fa-flag" style={{ width: "32px" }} />
              Seguimiento
            </Nav.Link>
            <Nav.Item className="my-2 pl-3" style={{ color: "gray" }}>
              <small>CONSULTAR</small>
            </Nav.Item>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/nómina/" + audit.auditId}
              active={navbar.auditMenu.active === "Nómina" ? true : false}
            >
              <i className="far fa-file-alt" style={{ width: "32px" }} />
              Nómina
            </Nav.Link>
            <Nav.Link
              className="navLinkStyle"
              href={"/audit/balanza/" + audit.auditId}
              active={navbar.auditMenu.active === "Balanza" ? true : false}
            >
              <i className="far fa-file-alt" style={{ width: "32px" }} />
              Balanza
            </Nav.Link>
            {/* if there's an audit opened, the exit button is sending the user to the audits page */}
            <div className="mt-auto bg-warning">
              <Nav.Item className="pl-3" style={{ color: "#7289da" }}>
                {audit.name}
              </Nav.Item>
              <Nav.Item className="pl-3" style={{ color: "#7289da" }}>
                {user.name + " " + user.firstSurname}
              </Nav.Item>
              <Nav.Item className="pl-3" style={{ color: "#7289da" }}>
                {user.role}
              </Nav.Item>
              <Button
                className="shadow-sm"
                variant="danger"
                block
                href="/audits"
              >
                Salir
              </Button>
            </div>
          </>
        ) : null}
      </Nav>
      {/* ================================================================= */}
      {/* HORIZONTAL navbar */}
      <Navbar
        id="navbarStyle"
        variant="dark"
        collapseOnSelect
        className="d-flex d-lg-none"
        expand="lg"
      >
        <Navbar.Brand id="navbarLogo">APAG</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {navbar.homeMenu.show ? (
            <section>
              <Nav className="mr-auto">
                <Navbar.Text style={{ color: "gray" }}>
                  <small>MENÚ</small>
                </Navbar.Text>
                <Nav.Link
                  href="/audits"
                  className="navLink"
                  active={
                    navbar.homeMenu.active === "Auditorías" ? true : false
                  }
                >
                  <i className="fas fa-project-diagram mr-2" />
                  Auditorías
                </Nav.Link>
                <Nav.Link
                  href="/clients"
                  className="navLink"
                  active={navbar.homeMenu.active === "Clientes" ? true : false}
                >
                  <i className="fas fa-user-friends mr-2" />
                  Clientes
                </Nav.Link>
                {/* if there's an audit opened, the exit button is sending the user to the audits page */}
                <Button
                  className="shadow-sm mt-2"
                  variant="danger"
                  onClick={logout}
                >
                  Salir
                </Button>
              </Nav>
            </section>
          ) : null}
          {navbar.auditMenu.show && audit.isOpen ? (
            <section>
              <Nav className="mr-auto">
                <Nav.Item style={{ color: "#7289da" }}>
                  <small>{user.name + " " + user.firstSurname}</small>
                </Nav.Item>
                <Nav.Item style={{ color: "#7289da" }}>
                  <small>{user.role}</small>
                </Nav.Item>
                <Nav.Item style={{ color: "#7289da" }}>
                  <small>{user.email}</small>
                </Nav.Item>
                <Navbar.Text style={{ color: "gray" }}>
                  <small>MENÚ</small>
                </Navbar.Text>
                <Nav.Link
                  className="navLink"
                  href={"/audit/home/" + audit.auditId}
                  active={navbar.auditMenu.active === "Inicio" ? true : false}
                >
                  <i className="fas fa-home mr-2" />
                  Inicio
                </Nav.Link>
                <Nav.Link
                  className="navLink"
                  href={"/audit/details/" + audit.auditId}
                  active={navbar.auditMenu.active === "Detalles" ? true : false}
                >
                  <i className="fas fa-info-circle mr-2" />
                  Detalles
                </Nav.Link>
                <Navbar.Text style={{ color: "gray" }}>
                  <small>FASES</small>
                </Navbar.Text>
                <Nav.Link
                  className="navLink"
                  href={"/audit/planning/" + audit.auditId}
                  active={
                    navbar.auditMenu.active === "Planeación" ? true : false
                  }
                >
                  <i className="fas fa-tasks mr-2" />
                  Planeación
                </Nav.Link>
                <Nav.Link
                  className="navLink"
                  href={"/audit/execution/" + audit.auditId}
                  active={
                    navbar.auditMenu.active === "Ejecución" ? true : false
                  }
                >
                  <i className="fas fa-chess mr-2" />
                  Ejecución
                </Nav.Link>
                <Nav.Link
                  className="navLink"
                  href={"/audit/reporting/" + audit.auditId}
                  active={navbar.auditMenu.active === "Informes" ? true : false}
                >
                  <i className="fas fa-folder-open mr-2" />
                  Informes
                </Nav.Link>
                <Nav.Link
                  className="navLink"
                  href={"/audit/followup/" + audit.auditId}
                  active={
                    navbar.auditMenu.active === "Seguimiento" ? true : false
                  }
                >
                  <i className="fas fa-flag mr-2" />
                  Seguimiento
                </Nav.Link>
                <Navbar.Text style={{ color: "gray" }}>
                  <small>CONSULTAR</small>
                </Navbar.Text>
                <Nav.Link
                  className="navLink"
                  href={"/audit/nómina/" + audit.auditId}
                  active={navbar.auditMenu.active === "Nómina" ? true : false}
                >
                  <i className="far fa-file-alt mr-2" />
                  Nómina
                </Nav.Link>
                <Nav.Link
                  className="navLink"
                  href={"/audit/balanza/" + audit.auditId}
                  active={navbar.auditMenu.active === "Balanza" ? true : false}
                >
                  <i className="far fa-file-alt mr-2" />
                  Balanza
                </Nav.Link>
                {/* if there's an audit opened, the exit button is sending the user to the audits page */}
                <Button
                  className="shadow-sm mt-2"
                  variant="danger"
                  href="/audits"
                >
                  Salir
                </Button>
              </Nav>
            </section>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MyNavbar;

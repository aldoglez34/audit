import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Button, Image } from "react-bootstrap";
import * as auditActions from "../redux-actions/auditActions";
import fire from "../firebase/Fire";
import "./leftnav.scss";

function LeftNav() {
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
    <Nav className="d-none d-lg-flex flex-column h-100" id="verticalNavStyle">
      <div className="text-center">
        <Nav.Item id="verticalNavLogo">APAG</Nav.Item>
      </div>
      {/* HOME menu */}
      {navbar.homeMenu.show ? (
        <>
          <Nav.Item className="navItemStyle">
            <small>MENÚ</small>
          </Nav.Item>
          <Nav.Link
            className="navLinkStyle"
            href="/audits"
            active={navbar.homeMenu.active === "Auditorías" ? true : false}
          >
            <i className="fas fa-project-diagram" style={{ width: "32px" }} />
            Auditorías
          </Nav.Link>
          <Nav.Link
            className="navLinkStyle"
            href="/clients"
            active={navbar.homeMenu.active === "Clientes" ? true : false}
          >
            <i className="fas fa-user-friends" style={{ width: "32px" }} />
            Clientes
          </Nav.Link>
          {/* if there's no audit opened, the exit button is gonna end user session */}
          <div className="mt-auto p-3">
            <Button variant="danger" onClick={logout} block>
              Salir de APAG
            </Button>
          </div>
        </>
      ) : null}
      {/* AUDIT menu */}
      {navbar.auditMenu.show && audit.isOpen ? (
        <>
          <Nav.Item className="navItemStyle">
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
          <Nav.Item className="navItemStyle">
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
          <Nav.Item className="navItemStyle">
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
          <div className="mt-auto p-3">
            <Button variant="danger" href="/audits" block>
              Cerrar Auditoría
            </Button>
          </div>
        </>
      ) : null}
    </Nav>
  );
}
export default LeftNav;

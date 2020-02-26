import React from "react";
import { useSelector } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import "./leftnav.scss";

const LeftNav = React.memo(function LeftNav(props) {
  const audit = useSelector(state => state.audit);

  return (
    <Nav className=" flex-column h-100" id="verticalNavStyle">
      <div className="text-center">
        <Nav.Item id="verticalNavLogo">APAG</Nav.Item>
      </div>
      {/* HOME menu */}
      {props.homeMenu ? (
        <>
          <Nav.Item className="navItemStyle">
            <small>MENÚ</small>
          </Nav.Item>
          <Nav.Link
            className="navLinkStyle"
            href="/audits"
            active={props.homeMenu === "Auditorías" ? true : false}
          >
            <i className="fas fa-project-diagram" style={{ width: "32px" }} />
            Auditorías
          </Nav.Link>
          <Nav.Link
            className="navLinkStyle"
            href="/clients"
            active={props.homeMenu === "Clientes" ? true : false}
          >
            <i className="fas fa-user-friends" style={{ width: "32px" }} />
            Clientes
          </Nav.Link>
        </>
      ) : null}
      {/* AUDIT menu */}
      {props.auditMenu ? (
        <>
          <Nav.Item className="navItemStyle">
            <small>MENÚ</small>
          </Nav.Item>
          <Nav.Link
            className="navLinkStyle"
            href={"/audit/home/" + audit.auditId}
            active={props.auditMenu === "Inicio" ? true : false}
          >
            <i className="fas fa-home" style={{ width: "32px" }} />
            Inicio
          </Nav.Link>
          <Nav.Item className="navItemStyle">
            <small>FASES</small>
          </Nav.Item>
          <Nav.Link
            className="navLinkStyle"
            href={"/audit/planning/guía"}
            active={props.auditMenu === "Planeación" ? true : false}
          >
            <i className="fas fa-tasks" style={{ width: "32px" }} />
            Planeación
          </Nav.Link>
          <Nav.Link
            className="navLinkStyle"
            href={"/audit/execution"}
            active={props.auditMenu === "Ejecución" ? true : false}
            disabled
          >
            <i className="fas fa-chess" style={{ width: "32px" }} />
            Ejecución
          </Nav.Link>
          <Nav.Link
            className="navLinkStyle"
            href={"/audit/reporting/"}
            active={props.auditMenu === "Informes" ? true : false}
            disabled
          >
            <i className="fas fa-chart-bar" style={{ width: "32px" }} />
            Informes
          </Nav.Link>
          <Nav.Link
            className="navLinkStyle"
            href={"/audit/followup/"}
            active={props.auditMenu === "Seguimiento" ? true : false}
            disabled
          >
            <i className="fas fa-forward" style={{ width: "32px" }} />
            Seguimiento
          </Nav.Link>
          <Nav.Item className="navItemStyle">
            <small>CONSULTA</small>
          </Nav.Item>
          <Nav.Link
            className="navLinkStyle"
            href={"/audit/balanza/"}
            active={props.auditMenu === "Balanza" ? true : false}
          >
            <i className="far fa-file-alt" style={{ width: "32px" }} />
            Balanza
          </Nav.Link>
          <Nav.Link
            className="navLinkStyle"
            href={"/audit/auxiliares/"}
            active={props.auditMenu === "Auxiliares" ? true : false}
            disabled
          >
            <i className="far fa-file-alt" style={{ width: "32px" }} />
            Auxiliares
          </Nav.Link>
          <div className="mt-auto p-3">
            <Button variant="danger" href="/audits" block>
              Cerrar Auditoría
            </Button>
          </div>
        </>
      ) : null}
    </Nav>
  );
});

export default LeftNav;

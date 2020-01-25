import React from "react";
import { ListGroup } from "react-bootstrap";
import Layout from "../Layout";
import WorkplanActivity from "./components/WorkplanActivity";
import "./planning.scss";
import { useSelector } from "react-redux";
import HelpTooltip from "./components/HelpTooltip";

const Planning = React.memo(function Planning() {
  const audit = useSelector(state => state.audit);

  return (
    <Layout auditMenu="Planeación">
      {/* title */}
      <div className="d-flex flex-row">
        <div>
          <h2>Planeación</h2>
          <hr className="myDivider" />
        </div>
        <div className="ml-auto d-flex align-items-center">
          <HelpTooltip
            title="Etapa de Planeación"
            text="Etapa de la auditoría que contiene la guía de trabajo y los papeles
            de trabajo en que se documenta la fase de planeación de la
            auditoría. Esta fase consta de actividades de indagación sobre el
            cliente y de análisis del alcance general, que culminan en la
            preparación la auditoria plasmada en el memorándum."
          />
        </div>
      </div>
      {/* content */}
      <section>
        <h5>Guía de trabajo</h5>
        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        {/* <Table borderless size="sm" hover responsive>
          <tbody>
            <WorkplanActivity
              id={1}
              text="Definir con el cliente los objetivos y requerimientos de
                        nuestros servicios con la finalidad de definir el
                        resultado de nuestro trabajo (alcances, tiempos, informes,
                        etc.)"
            />
            <WorkplanActivity
              id={2}
              text="Obtener una descripción general de la Entidad mediante
                entrevistas con los principales funcionarios que tengan bajo su
                responsabilidad el desarrollo de las actividades y programas."
            />
            <WorkplanActivity
              id={3}
              text="Solicitar y estudiar los informes de auditoría correspondientes
                al año de anterior y utilizar la información en ellos para
                efectos de esta fase, como resultado de las entrevistas tenidas
                con los funcionarios establecer el riesgo inherente."
            />
          </tbody>
        </Table> */}
      </section>
      <section>
        <h5>Cuestionarios</h5>
        <ul className="list-unstyled">
          <li>
            <ul>
              <li>
                <a href={"/audit/planning/cci/" + audit.auditId}>
                  Cuestionario de Control Interno
                </a>
              </li>
              <li>
                <a href={"/audit/planning/cefs/" + audit.auditId}>
                  Cédula de Estados Financieros del Sistema
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </Layout>
  );
});

export default Planning;

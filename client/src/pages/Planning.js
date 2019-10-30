import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import { Table, Badge } from "react-bootstrap";
import Layout from "./Layout";
import WorkplanActivity from "../components/WorkplanActivity";

function Planning() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Planeación"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>{audit.name + "/"}</span>
        <span className="text-muted">Planeación</span>
      </h2>
      <hr />
      <section>
        <h5>Descripción</h5>
        <p>
          Etapa de la auditoría que contiene la guía de trabajo y los papeles de
          trabajo en que se documenta la fase de planeación de la auditoría.
          Esta fase consta de actividades de indagación sobre el cliente y de
          análisis del alcance general, que culminan en la preparación la
          auditoria plasmada en el memorándum.
        </p>
      </section>
      <section>
        <h5>Cuestionarios</h5>
        <ul className="list-unstyled">
          <li>
            <ul>
              <li>
                <a href="/audits/planning/cci/" style={{ color: "#516fd6" }}>
                  Cuestionario de Control Interno
                </a>
                <Badge
                  className="ml-1"
                  style={{ fontFamily: "Arial" }}
                  variant="warning"
                >
                  Completado
                </Badge>
              </li>
              <li>
                <a href="/audits/planning/cefs/" style={{ color: "#516fd6" }}>
                  Cédula de Estados Financieros del Sistema
                </a>
                <Badge
                  className="ml-1"
                  style={{ fontFamily: "Arial" }}
                  variant="success"
                >
                  Completado
                </Badge>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section>
        <h5>Guía de trabajo</h5>
        <Table borderless size="sm" hover responsive>
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
        </Table>
      </section>
    </Layout>
  ) : null;
}

export default Planning;

import React from "react";
import Layout from "../Layout";
import { useSelector } from "react-redux";

function Nómina() {
  const audit = useSelector(state => state.audit);

  return (
    <Layout auditMenu="Nómina" auditOpened="SOMETHING">
      <h2>Nómina</h2>
      <hr className="myDivider" />
      {audit.hasNómina ? (
        <span>Mostrando nómina</span>
      ) : (
        <span>
          La nómina no ha sido cargada aún,{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => alert("test")}
          >
            haz click aquí
          </span>{" "}
          para cargarla
        </span>
      )}
    </Layout>
  );
}

export default Nómina;

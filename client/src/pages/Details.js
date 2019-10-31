import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";

function Details() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Detalles"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>Detalles</span>
      </h2>
      <hr />
      <h5>Descripción de la Auditoría</h5>
      <p>{audit.description}</p>
      <h5>Fecha de creación</h5>
      <p>{audit.createdAt}</p>
      <h5>Última modificación</h5>
      <p>{audit.createdAt}</p>
    </Layout>
  ) : null;
}

export default Details;

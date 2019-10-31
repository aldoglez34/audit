import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../../redux-actions/navbarActions";
import Layout from "../Layout";

function Nómina() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Nómina"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>Nómina</span>
      </h2>
      <hr />
      {audit.hasNómina ? (
        <span>has nómina: true</span>
      ) : (
        <span>La Nómina de {audit.name} no está disponible</span>
      )}
    </Layout>
  ) : null;
}

export default Nómina;

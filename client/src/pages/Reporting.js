import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";

function Reporting() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Informes"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>Informes</span>
      </h2>
      <hr />
      ...
    </Layout>
  ) : null;
}

export default Reporting;

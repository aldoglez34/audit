import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import * as auditActions from "../redux-actions/auditActions";
import Layout from "./Layout";

function Execution() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Ejecución"));
    dispatch(auditActions.setBackBttn(null));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>Ejecución</span>
      </h2>
      <hr />
      ...
    </Layout>
  ) : null;
}

export default Execution;

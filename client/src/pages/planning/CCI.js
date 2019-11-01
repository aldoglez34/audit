import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../../redux-actions/navbarActions";
import * as auditActions from "../../redux-actions/auditActions";
import Layout from "../Layout";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CCI() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Planeación"));
    dispatch(auditActions.setBackBttn("/audit/planning/" + audit.auditId));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>Cuestionario de Control Interno</span>
      </h2>
      <hr />
      ... Cuestionario de Control Interno
    </Layout>
  ) : null;
}

export default CCI;

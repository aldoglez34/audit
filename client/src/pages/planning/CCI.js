import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../../redux-actions/navbarActions";
import * as auditActions from "../../redux-actions/auditActions";
import Layout from "../Layout";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CCI() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  const [questions] = useState([
    { key: "q1", q: "Esta es la pregunta uno", a: "respuesta uno" },
    { key: "q2", q: "Esta es la pregunta dos", a: "" },
    { key: "q3", q: "Esta es la pregunta tres", a: "" }
  ]);

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
      <Formik
        initialValues={{
          q1: "",
          q2: "",
          q3: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <Form noValidate onSubmit={handleSubmit}>
              {questions.map(q => {
                return (
                  <Form.Group key={q.key}>
                    <Form.Label>
                      {q.q}
                      <small className="ml-2">(150)</small>
                    </Form.Label>
                    <Form.Control
                      maxLength="150"
                      type="text"
                      name={q.key}
                      value={values.q1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                );
              })}
              <Button
                className="purplebttn"
                disabled={isSubmitting}
                type="submit"
              >
                Enviar respuestas
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </Layout>
  ) : null;
}

export default CCI;

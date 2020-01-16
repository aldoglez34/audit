import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../../../redux/actions/navbarActions";
import * as auditActions from "../../../redux/actions/auditActions";
import Layout from "../../Layout";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CCI() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  const [questions] = useState([
    { id: "q1", question: "Esta es la pregunta uno", answer: "respuesta uno" },
    { id: "q2", question: "Esta es la pregunta dos", answer: "dos" },
    { id: "q3", question: "Esta es la pregunta tres", answer: "three" }
  ]);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Planeación"));
    dispatch(auditActions.setBackBttn("/audit/planning/" + audit.auditId));
  }, []);

  const initVals = () => {
    let values = {};
    questions.map(q => (values[q.id] = q.answer));
    return values;
  };

  return audit ? (
    <Layout>
      <h2>
        <span>Cuestionario de Control Interno</span>
      </h2>
      <hr />
      <Formik
        initialValues={initVals()}
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
                  <Form.Group key={q.id}>
                    <Form.Label>
                      {q.question}
                      <small className="ml-2">(150)</small>
                    </Form.Label>
                    <Form.Control
                      maxLength="150"
                      type="text"
                      name={q.id}
                      value={values[q.id]}
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

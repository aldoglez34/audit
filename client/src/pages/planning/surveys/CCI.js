import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../Layout";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CCI = React.memo(function CCI() {
  const audit = useSelector(state => state.audit);

  const [questions] = useState([
    { id: "q1", question: "Esta es la pregunta uno", answer: "respuesta uno" },
    { id: "q2", question: "Esta es la pregunta dos", answer: "dos" },
    { id: "q3", question: "Esta es la pregunta tres", answer: "three" }
  ]);

  const initVals = () => {
    let values = {};
    questions.map(q => (values[q.id] = q.answer));
    return values;
  };

  return (
    <Layout
      auditMenu="Planeación"
      backButton={"/audit/planning/" + audit.auditId}
    >
      {/* title */}
      <h2>Cuestionario de Control Interno</h2>
      <hr className="myDivider" />
      {/* content */}
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
              <Form.Row className="px-1 justify-content-end">
                <Button
                  className="purplebttn"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <i className="fas fa-save mr-2 " />
                  Guardar
                </Button>
              </Form.Row>
            </Form>
          </>
        )}
      </Formik>
    </Layout>
  );
});

export default CCI;

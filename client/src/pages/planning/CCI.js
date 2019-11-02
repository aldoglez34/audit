import React, { useEffect } from "react";
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
          q2: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>
                  ¿La Entidad cuenta con un Código de Ética y un Código de
                  Conducta, que delimite la actuación ética que deben observar
                  los servidores públicos?<small className="ml-2">(150)</small>
                </Form.Label>
                <Form.Control
                  maxLength="150"
                  type="text"
                  name="q1"
                  value={values.q1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  ¿La Entidad cuenta con Reglamento Interior y está publicado en
                  Gaceta Oficial? Especificar qué publicación.
                  <small className="ml-2">(150)</small>
                </Form.Label>
                <Form.Control
                  maxLength="150"
                  type="text"
                  name="q2"
                  value={values.q2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
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

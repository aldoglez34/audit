import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../Layout";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import API from "../../../utils/API";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Surveys = React.memo(function Surveys(props) {
  const audit = useSelector(state => state.audit);

  const [survey, setSurvey] = useState([]);

  useEffect(() => {
    API.getSurvey(props.routeProps.match.params.surveyTitle)
      .then(res => setSurvey(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout
      auditMenu="Planeación"
      backButton={"/audit/planning/" + audit.auditId}
    >
      {/* title */}
      <h2>{props.routeProps.match.params.surveyTitle}</h2>
      <hr className="myDivider" />
      {/* content */}
      <Formik
        // initialValues={initVals()}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <Form noValidate onSubmit={handleSubmit}>
              {survey.map(s => {
                return (
                  <Form.Group key={q.id}>
                    <Form.Label>{q.question}</Form.Label>
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

export default Surveys;

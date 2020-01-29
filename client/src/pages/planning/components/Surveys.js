import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../Layout";
import { Spinner, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import API from "../../../utils/API";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Surveys = React.memo(function Surveys(props) {
  const audit = useSelector(state => state.audit);

  const [survey, setSurvey] = useState([]);

  useEffect(() => {
    let surveyTitle = props.routeProps.match.params.surveyTitle;
    let auditId = audit.auditId;
    API.fetchSurvey({ surveyTitle, auditId })
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
      {survey.length ? (
        <Formik
          // initialValues={initVals()}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <>
              {console.log(survey)}
              <Form noValidate onSubmit={handleSubmit}>
                {survey.map(q => {
                  return (
                    <Form.Group key={q.surveyId}>
                      <Form.Label>{q.question}</Form.Label>
                      <Form.Control
                        maxLength="150"
                        type="text"
                        placeholder="Ingresa la respuesta"
                        name={q.surveyId}
                        // value={values[q.id]}
                        value={
                          q.SurveyAnswers.length
                            ? q.SurveyAnswers[0].answer
                            : ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // isValid={touched.name && !errors.name}
                        // isInvalid={touched.name && !!errors.name}
                      />
                      {/* <ErrorMessage
                        className="text-danger"
                        name="name"
                        component="div"
                      /> */}
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
      ) : (
        <div className="text-center mt-4 pt-4">
          <Spinner animation="border" />
        </div>
      )}
    </Layout>
  );
});

export default Surveys;

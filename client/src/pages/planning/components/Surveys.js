import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../Layout";
import { Spinner, Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import API from "../../../utils/API";
import SurveyDropdown from "./SurveyDropdown";
// const assert = require("assert");

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

  const initValues = s => {
    console.log(s);
    let values = {};
    s.map(
      q =>
        (values[q.surveyId] = q.SurveyAnswers.length
          ? q.SurveyAnswers[0].answer
          : "")
    );
    return values;
  };

  return (
    <Layout
      auditMenu="Planeación"
      backButton={"/audit/planning/" + audit.auditId}
    >
      {/* title */}
      <div className="d-flex flex-row">
        <div>
          <h2>{props.routeProps.match.params.surveyTitle}</h2>
          <hr className="myDivider" />
        </div>
        <div className="ml-auto d-flex align-items-center">
          <SurveyDropdown />
        </div>
      </div>
      {/* content */}
      {survey.length ? (
        <Formik
          initialValues={initValues(survey)}
          onSubmit={(values, { setSubmitting }) => {
            // setSubmitting(true);
            // remember survey has the initialValues!
            let initialValues = {};
            survey.map(
              q =>
                (initialValues[q.surveyId] = q.SurveyAnswers.length
                  ? q.SurveyAnswers[0].answer
                  : "")
            );
            console.log("@onSubmit - initial values:", initialValues);
            console.log("@onSubmit - new values:", values);
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
              <Form noValidate onSubmit={handleSubmit}>
                {survey.map(q => {
                  return (
                    <Form.Group key={q.surveyId}>
                      <Form.Label>{q.question}</Form.Label>
                      <Form.Control
                        maxLength="250"
                        type="text"
                        placeholder="Ingresa la respuesta"
                        name={q.surveyId}
                        value={values[q.surveyId]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched[q.surveyId] && !errors[q.surveyId]}
                        isInvalid={touched[q.surveyId] && !!errors[q.surveyId]}
                      />
                      <ErrorMessage
                        className="text-danger"
                        name={q.surveyId}
                        component="div"
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
      ) : (
        <div className="text-center mt-4 pt-4">
          <Spinner animation="border" />
        </div>
      )}
    </Layout>
  );
});

export default Surveys;

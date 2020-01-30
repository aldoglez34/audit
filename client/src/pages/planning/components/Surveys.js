import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../Layout";
import { Spinner, Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import API from "../../../utils/API";
import SurveyDropdown from "./SurveyDropdown";
import { diff } from "deep-object-diff";

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
    let values = {};
    s.map(
      q =>
        (values[q.surveyId] = q.SurveyAnswers.length
          ? q.SurveyAnswers[0].answer
          : "")
    );
    return values;
  };

  const convertToArr = obj => {
    let arr = [];
    for (let [key, value] of Object.entries(obj)) {
      arr.push({ surveyId: key, answer: value });
    }
    return arr;
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
            setSubmitting(false);
            // remember "survey" still has the initialValues
            let initialValues = initValues(survey);
            // ONLY post/put answers that changed
            // use "diff" to catch all the changes between initial values and final values
            // the result will be an object with the properties that changed
            // if nothing changed, the result will be an empty object
            let changes = diff(initialValues, values);
            // check if "changes" is empty
            if (!Object.keys(changes).length) {
              alert("No se registraron cambios en las respuestas");
            } else {
              let arr = convertToArr(changes);
              // handle saving answers
              let saveAllAnswers = new Promise((resolve, reject) => {
                // iterate answers array
                arr.forEach((value, index, array) => {
                  // if the answer is empty, delete it from the db
                  if (value.answer === "") {
                    API.deleteAnswer([audit.auditId, value])
                      .then(res => {
                        console.log("@forEach, deleting answer", value, res);
                        if (index === array.length - 1) resolve();
                      })
                      .catch(err => console.log(err));
                  }
                  // if the answer is not empty AND its initialValue is empty, post it
                  else if (
                    !value.answer === "" &&
                    initialValues[value.surveyId] === ""
                  ) {
                    API.postNewAnswer([audit.auditId, value])
                      .then(res => {
                        console.log("@forEach, posting answer", value, res);
                        if (index === array.length - 1) resolve();
                      })
                      .catch(err => console.log(err));
                  }
                  // if the answer is not empty AND its initialValue is not empty either, update it
                  else if (
                    !value.answer === "" &&
                    !initialValues[value.surveyId] === ""
                  ) {
                    API.updateAnswer([audit.auditId, value])
                      .then(res => {
                        console.log("@forEach, updating answer", value, res);
                        if (index === array.length - 1) resolve();
                      })
                      .catch(err => console.log(err));
                  }
                });
              });

              // this is gonna be executed when I calll resolve
              saveAllAnswers
                .then(() => alert("Respuestas guardadas con éxito"))
                .catch(err => {
                  console.log(err);
                  alert("Ocurrió un error");
                });

              // API.saveNewAnswer([audit.auditId, arr])
              //   .then(res => {
              //     // check if errors
              //     if (res.data.errors) {
              //       alert(res.data.errors[0].message);
              //       setSubmitting(false);
              //     } else {
              //       alert("Respuestas guardadads con éxito");
              //     }
              //   })
              //   .catch(err => console.log(err));
            }
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
                        placeholder="Ingresa una respuesta"
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

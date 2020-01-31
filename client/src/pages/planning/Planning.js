import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "./planning.scss";
import HelpTooltip from "./components/HelpTooltip";
import Workplan from "./components/Workplan";
import SurveyTitles from "./components/SurveyTitles";
import API from "../../utils/API";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Planning = React.memo(function Planning() {
  const audit = useSelector(state => state.audit);

  const [workplan, setWorkplan] = useState([]);
  const [surveyTitles, setSurveyTitles] = useState([]);

  useEffect(() => {
    API.fetchWorkplan(audit.auditId)
      .then(res => setWorkplan(res.data))
      .catch(err => console.log(err));
    API.fetchSurveyTitles()
      .then(res => setSurveyTitles(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout auditMenu="Planeación">
      {/* title */}
      <div className="d-flex flex-row">
        <div>
          <h2>Planeación</h2>
          <hr className="myDivider" />
        </div>
        <div className="ml-auto d-flex align-items-center">
          <HelpTooltip
            title="Etapa de Planeación"
            text="Etapa de la auditoría que contiene la guía de trabajo y los papeles
            de trabajo en que se documenta la fase de planeación de la
            auditoría. Esta fase consta de actividades de indagación sobre el
            cliente y de análisis del alcance general, que culminan en la
            preparación la auditoria plasmada en el memorándum."
          />
        </div>
      </div>
      {/* tabs */}
      {workplan.length && surveyTitles.length ? (
        <Tabs defaultActiveKey="Guía de trabajo" className="customTabs">
          <Tab eventKey="Guía de trabajo" title="Guía de trabajo">
            <Workplan workplan={workplan} />
          </Tab>
          <Tab eventKey="Cuestionarios" title="Cuestionarios">
            <br />
            <SurveyTitles surveyTitles={surveyTitles} />
          </Tab>
        </Tabs>
      ) : (
        <div className="text-center mt-4 pt-4">
          <Spinner animation="border" />
        </div>
      )}
    </Layout>
  );
});

export default Planning;

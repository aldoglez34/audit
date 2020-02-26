import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";

const SurveyTitles = React.memo(function SurveyTitles(props) {
  return (
    <div className="bg-white rounded-bottom p-3 border border-top-0">
      <div className="text-center mt-4">
        <Image src="/images/webpage.png" />
      </div>
      <h5 className="text-center mt-3">
        Cuestionarios para la fase de Planeación
      </h5>
      <ul className="mt-4">
        {props.surveyTitles.map(st => {
          return (
            <li key={st.title}>
              <a href={"/audit/planning/survey/" + st.title}>{st.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

SurveyTitles.propTypes = {
  surveyTitles: PropTypes.array.isRequired
};

export default SurveyTitles;

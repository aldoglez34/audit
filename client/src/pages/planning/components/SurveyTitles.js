import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";

const Surveys = React.memo(function Surveys(props) {
  const audit = useSelector(state => state.audit);

  return (
    <div className="bg-white rounded-bottom p-3 border border-top-0">
      <div className="text-center mb-2">
        <Image src="/images/note.png" />
      </div>
      <h5 className="text-center">Cuestionarios para la fase de Planeación</h5>
      <ul>
        {props.surveyTitles.map(st => {
          return (
            <li key={st.title}>
              <a
                href={
                  "/audit/planning/survey/" + audit.auditId + "/" + st.title
                }
              >
                {st.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

Surveys.propTypes = {
  surveyTitles: PropTypes.array.isRequired
};

export default Surveys;
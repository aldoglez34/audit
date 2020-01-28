import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Surveys = React.memo(function Surveys(props) {
  const audit = useSelector(state => state.audit);

  return (
    <ul>
      {props.surveyTitles.map(st => {
        return (
          <li key={st.title}>
            <a href={"/audit/planning/survey/" + audit.auditId}>{st.title}</a>
          </li>
        );
      })}
    </ul>
  );
});

Surveys.propTypes = {
  surveyTitles: PropTypes.array.isRequired
};

export default Surveys;

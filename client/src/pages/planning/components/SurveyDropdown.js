import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const SurveyDropdown = React.memo(function SurveyDropdown() {
  return (
    <DropdownButton
      drop="left"
      variant="transparent"
      id="surveyDropdown"
      title={
        <i
          className="fas fa-bars"
          style={{ fontSize: "25px", color: "#5979e3" }}
        />
      }
    >
      <Dropdown.Item eventKey="1">Imprimir en PDF</Dropdown.Item>
    </DropdownButton>
  );
});

export default SurveyDropdown;

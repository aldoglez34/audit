import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

SortAuditsDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  handleSorting: PropTypes.func.isRequired
};

function SortAuditsDropdown(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="auditsDropdown">
        <i className="fas fa-arrows-alt-v mr-1" />
        {props.title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Orden alfabético A-Z")}
          active={props.title === "Orden alfabético A-Z" ? true : false}
        >
          Orden alfabético A-Z
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Orden alfabético Z-A")}
          active={props.title === "Orden alfabético Z-A" ? true : false}
        >
          Orden alfabético Z-A
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Orden por año A-Z")}
          active={props.title === "Orden por año A-Z" ? true : false}
        >
          Orden por año A-Z
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Orden por año Z-A")}
          active={props.title === "Orden por año Z-A" ? true : false}
        >
          Orden por año Z-A
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Última actualización")}
          active={props.title === "Última actualización" ? true : false}
        >
          Última actualización
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortAuditsDropdown;

import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

SortClientsDropdown.propTypes = {
  activeSort: PropTypes.string.isRequired,
  handleSorting: PropTypes.func.isRequired
};

function SortClientsDropdown(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="auditsDropdown">
        <i className="fas fa-arrows-alt-v mr-1" />
        {props.activeSort}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Orden alfabético A-Z")}
          active={props.activeSort === "Orden alfabético A-Z" ? true : false}
        >
          Orden alfabético A-Z
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Orden alfabético Z-A")}
          active={props.activeSort === "Orden alfabético Z-A" ? true : false}
        >
          Orden alfabético Z-A
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortClientsDropdown;

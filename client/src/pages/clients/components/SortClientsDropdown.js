import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const SortClientsDropdown = React.memo(function SortClientsDropdown(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="auditsDropdown border-0"
        // style={{ fontSize: "16px" }}
      >
        <i className="fas fa-sort-amount-down mr-1" />
        <span>Orden</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Alfabeto ascendente")}
          active={props.activeSort === "Alfabeto ascendente" ? true : false}
        >
          <i className="fas fa-sort-alpha-down mr-2" />
          Alfabeto ascendente
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Alfabeto descendente")}
          active={props.activeSort === "Alfabeto descendente" ? true : false}
        >
          <i className="fas fa-sort-alpha-up mr-2" />
          Alfabeto descendente
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

SortClientsDropdown.propTypes = {
  activeSort: PropTypes.string.isRequired,
  handleSorting: PropTypes.func.isRequired
};

export default SortClientsDropdown;

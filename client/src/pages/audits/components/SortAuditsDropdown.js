import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const SortAuditsDropdown = React.memo(function SortAuditsDropdown(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="auditsDropdown rounded-0"
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
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Año ascendente")}
          active={props.activeSort === "Año ascendente" ? true : false}
        >
          <i className="fas fa-sort-numeric-down mr-2" />
          Año ascendente
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Año descendente")}
          active={props.activeSort === "Año descendente" ? true : false}
        >
          <i className="fas fa-sort-numeric-up mr-2" />
          Año descendente
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleSorting("Última actualización")}
          active={props.activeSort === "Última actualización" ? true : false}
        >
          <i className="far fa-clock mr-2" />
          Última actualización
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

SortAuditsDropdown.propTypes = {
  activeSort: PropTypes.string.isRequired,
  handleSorting: PropTypes.func.isRequired
};

export default SortAuditsDropdown;

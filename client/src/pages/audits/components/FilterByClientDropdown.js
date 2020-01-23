import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

FilterByClientDropdown.propTypes = {
  audits: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleFilterByClient: PropTypes.func
};

function FilterByClientDropdown(props) {
  return audits.length ? (
    <Dropdown>
      <Dropdown.Toggle className="auditsDropdown rounded-0">
        <i className="fas fa-filter mr-1" />
        {props.activeFilter}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleFilterByClient("Todos los Clientes")}
          active={props.activeFilter === "Todos los Clientes" ? true : false}
        >
          Todos los Clientes
        </Dropdown.Item>
        <Dropdown.Divider />
        {audits.map(a => {
          return (
            <Dropdown.Item
              className="dropdownitem"
              onClick={() => props.handleFilterByClient(c)}
              key={c}
              active={a === props.activeFilter ? true : false}
            >
              {"Sólo " + a}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  ) : null;
}

export default FilterByClientDropdown;

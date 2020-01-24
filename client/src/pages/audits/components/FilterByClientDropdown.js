import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

FilterByClientDropdown.propTypes = {
  uniqueClients: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired
};

function FilterByClientDropdown(props) {
  return props.uniqueClients.length ? (
    <Dropdown>
      <Dropdown.Toggle className="auditsDropdown rounded-0">
        <i className="fas fa-filter mr-1" />
        {props.activeFilter}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="dropdownitem"
          href="/audits"
          active={props.activeFilter === "Todos los Clientes" ? true : false}
        >
          Todos los Clientes
        </Dropdown.Item>
        <Dropdown.Divider />
        {props.uniqueClients.map(c => {
          return (
            <Dropdown.Item
              className="dropdownitem"
              href={"/audits/" + c}
              key={c}
              active={c === props.activeFilter ? true : false}
            >
              {c}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  ) : null;
}

export default FilterByClientDropdown;

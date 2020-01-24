import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const FilterByClientDropdown = React.memo(function FilterByClientDropdown(
  props
) {
  return props.uniqueClients.length ? (
    <Dropdown>
      <Dropdown.Toggle
        className="auditsDropdown rounded-0"
        style={{ fontSize: "16px" }}
      >
        <i className="fas fa-filter mr-1" />
        <span>Filtros</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="dropdownitem"
          href="/audits"
          active={props.activeFilter === "Sin filtros" ? true : false}
        >
          Sin filtros
        </Dropdown.Item>
        <Dropdown.Divider />
        <strong className="dropdown-item-text text-secondary">Clientes</strong>
        {props.uniqueClients.map(c => {
          return (
            <Dropdown.Item
              className="dropdownitem"
              href={"/audits/" + c}
              key={c}
              active={c === props.activeFilter ? true : false}
            >
              <i className="fas fa-user-friends mr-2" />
              {c}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  ) : null;
});

FilterByClientDropdown.propTypes = {
  uniqueClients: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired
};

export default FilterByClientDropdown;

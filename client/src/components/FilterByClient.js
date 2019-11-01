import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

FilterByClient.propTypes = {
  data: PropTypes.array,
  activeClient: PropTypes.string,
  handleFilterByClient: PropTypes.func
};

function deleteDuplicates(data) {
  // first, lets get the clients from the data array
  let clientNames = [];
  data.forEach(c => {
    clientNames.push(c.Client.abbreviation);
  });
  // then delete duplicates
  let temp = [];
  clientNames.forEach(element => {
    temp.push(element);
  });
  let unique = [...new Set(temp)];
  return unique;
}

function FilterByClient(props) {
  const uniqueClients = deleteDuplicates(props.data);

  return uniqueClients.length ? (
    <Dropdown>
      <Dropdown.Toggle variant="dark" className="auditsFilter">
        {props.activeClient}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="dropdownitem"
          onClick={() => props.handleFilterByClient("Todos los Clientes")}
          active={props.activeClient === "Todos los Clientes" ? true : false}
        >
          Todos los Clientes
        </Dropdown.Item>
        <Dropdown.Divider />
        {uniqueClients.map(c => {
          return (
            <Dropdown.Item
              className="dropdownitem"
              onClick={() => props.handleFilterByClient(c)}
              key={c}
              active={"Sólo " + c === props.activeClient ? true : false}
            >
              {"Sólo " + c}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  ) : null;
}

export default FilterByClient;

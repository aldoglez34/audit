import React from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import PropTypes from "prop-types";
registerLocale("es", es);
setDefaultLocale("es");

const Workplan = React.memo(function Workplan(props) {
  const handleChange = workplanId => {
    let checkbox = document.getElementById(workplanId).checked;
    console.log(checkbox);
  };

  return (
    <Table>
      <tbody>
        {props.workplan.map(w => {
          return (
            <tr key={w.workplanId}>
              <td className="border-0">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    onChange={() => handleChange(w.workplanId)}
                    className="custom-control-input checkboxStyle"
                    id={w.workplanId}
                    defaultChecked={false}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={w.workplanId}
                  >
                    {w.text}
                  </label>
                </div>
              </td>
              {/* <td>
                <DatePicker
                  className="dateInput"
                  placeholderText="Inicio"
                  // selected={startDate}
                  // onChange={setStartDate}
                />
              </td>
              <td>
                <DatePicker
                  className="dateInput"
                  placeholderText="Final"
                  // selected={endDate}
                  // onChange={setEndDate}
                />
              </td> */}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});

Workplan.propTypes = {
  workplan: PropTypes.array.isRequired
};

export default Workplan;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");

const WorkplanActivity = React.memo(function WorkplanActivity(props) {
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);

  return (
    <tr>
      <td>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input checkboxStyle"
            id={"switch" + props.id}
            defaultChecked={false}
          />
          <label className="custom-control-label" htmlFor={"switch" + props.id}>
            {props.text}
          </label>
        </div>
      </td>
      <td>
        <DatePicker
          className="dateInput"
          placeholderText="Inicio"
          selected={startDate}
          onChange={setStartDate}
        />
      </td>
      <td>
        <DatePicker
          className="dateInput"
          placeholderText="Final"
          selected={endDate}
          onChange={setEndDate}
        />
      </td>
    </tr>
  );
});

export default WorkplanActivity;

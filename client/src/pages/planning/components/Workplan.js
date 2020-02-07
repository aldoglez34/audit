import React from "react";
import { Table, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import API from "../../../utils/API";
import { useSelector } from "react-redux";

const Workplan = React.memo(function Workplan(props) {
  const audit = useSelector(state => state.audit);

  const handleChange = workplanId => {
    let isChecked = document.getElementById(workplanId).checked;
    if (isChecked) {
      API.addWorkplanAnswer({ auditId: audit.auditId, workplanId })
        .then(res => {
          if (res.data.errors) alert(res.data.errors[0].message);
        })
        .catch(err => console.log(err));
    } else {
      API.deleteWorkplanAnswer(audit.auditId + "-" + workplanId)
        .then(res => {
          if (res.data.errors) alert(res.data.errors[0].message);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="bg-white rounded-bottom p-3 border border-top-0">
      <div className="text-center mb-2">
        <Image src="/images/list.png" />
      </div>
      <h5 className="text-center">Tareas para la fase de Planeación</h5>
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
                      defaultChecked={w.WorkplanAnswers.length ? true : false}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={w.workplanId}
                    >
                      {w.text}
                    </label>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
});

Workplan.propTypes = {
  workplan: PropTypes.array.isRequired
};

export default Workplan;

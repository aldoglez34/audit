import React, { useState } from "react";
import { Modal, Button, Spinner, Form, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as auditActions from "../../../../redux/actions/auditActions";
import API from "../../../../utils/API";

const LoadBalanza = React.memo(function LoadBalanza() {
  const dispatch = useDispatch();

  const [size, setSize] = useState("md");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const audit = useSelector(state => state.audit);
  const user = useSelector(state => state.user);

  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState([]);

  const loadFile = async e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;
      setFile(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const uploadFile = () => {
    setIsUploading(true);
    let auditId = audit.auditId;
    let hasHeaders = document.getElementById("hasHeaders").checked;
    //
    API.uploadBalanza({ auditId, hasHeaders, file })
      .then(res => {
        // check errors (custom)
        if (!res.data.error) {
          setSize("lg");
          setReport(res.data);
          // dispatch(auditActions.addBalanza());
        } else {
          alert(res.data.error);
          setFile();
          setIsUploading(false);
          handleClose();
        }
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  return user.role === "Admin" ? (
    <React.Fragment>
      <p>
        La balanza no ha sido cargada aún,{" "}
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={handleShow}
        >
          haz click aquí
        </span>{" "}
        para cargarla.
      </p>

      <Modal show={show} onHide={handleClose} size={size}>
        <Modal.Body>
          {report.length ? (
            <React.Fragment>
              <h3 className="mb-3">Reporte balanza</h3>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Total Saldo Inicial</th>
                    <th>Total Cargos</th>
                    <th>Total Abonos</th>
                    <th>Total Saldo Final</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {report.map(m => {
                    return (
                      <tr key={m.month}>
                        <td>{m.month}</td>
                        <td>{m.total_si}</td>
                        <td>{m.total_c}</td>
                        <td>{m.total_a}</td>
                        <td>{m.total_sf}</td>
                        <td>
                          {m.isSIZero && m.isSFZero && m.isCandATheSame ? (
                            <i className="fas fa-check text-success" />
                          ) : (
                            <i className="fas fa-times text-danger" />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Button
                className="mt-2"
                variant="secondary"
                onClick={() => {
                  handleClose();
                  window.location.reload();
                }}
              >
                Cerrar
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h3 className="mb-3">Cargar balanza</h3>
              {isUploading ? (
                <div className="d-flex flex-column justify-content-center align-items-center mt-4 mb-3">
                  <span className="mb-2">Cargando...</span>
                  <Spinner animation="border" />
                </div>
              ) : (
                <React.Fragment>
                  {!file ? (
                    <div
                      className="my-3 p-2 border rounded"
                      style={{ borderColor: "#264bc4" }}
                    >
                      <input
                        type="file"
                        accept=".csv"
                        onChange={e => loadFile(e)}
                      />
                    </div>
                  ) : (
                    <div
                      className="my-3 p-2 border rounded"
                      style={{ borderColor: "#264bc4" }}
                    >
                      <Form className="mt-4 mb-3">
                        <Form.Check
                          custom
                          inline
                          label="Mi archivo lleva encabezados"
                          type="checkbox"
                          id="hasHeaders"
                        />
                      </Form>
                      <Button
                        className="mt-3"
                        variant="primary"
                        onClick={uploadFile}
                      >
                        <i className="fas fa-upload mr-1" />
                        Cargar
                      </Button>
                    </div>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  ) : (
    <p>La balanza no ha sido cargada aún.</p>
  );
});

export default LoadBalanza;

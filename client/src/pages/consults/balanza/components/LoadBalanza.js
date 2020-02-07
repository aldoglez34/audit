import React, { useState } from "react";
import { Modal, Button, Spinner, Form, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as auditActions from "../../../../redux/actions/auditActions";
import API from "../../../../utils/API";

const LoadBalanza = React.memo(function LoadBalanza() {
  const dispatch = useDispatch();

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
    API.uploadBalanza({ auditId, hasHeaders, file })
      .then(res => {
        // if errors
        if (res.data.errors) {
          alert(res.data.errors[0].message);
        } else {
          setReport(res.data);
          // handleClose();
          // dispatch(auditActions.addBalanza());
          // window.location.reload();
        }
      })
      .catch(err => console.log(err));
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {report.length ? (
            <React.Fragment>
              <h3 className="mb-3">Reporte balanza</h3>
              <ListGroup>
                {report.map(m => {
                  return (
                    <ListGroup.Item key={m.month}>
                      <dl>
                        <dt className="mb-2">
                          <strong>{m.month}</strong>
                        </dt>
                        <dd>
                          Total Saldo Inicial:{" "}
                          {Math.round(Number(m.total_si)).toLocaleString()}
                        </dd>
                        <dd>
                          Total Cargos:{" "}
                          {Math.round(Number(m.total_c)).toLocaleString()}
                        </dd>
                        <dd>
                          Total Abonos:{" "}
                          {Math.round(Number(m.total_a)).toLocaleString()}
                        </dd>
                        <dd>
                          Total Saldo Final:{" "}
                          {Math.round(Number(m.total_sf)).toLocaleString()}
                        </dd>
                      </dl>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
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
                      <Form>
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
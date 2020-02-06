import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as auditActions from "../../../redux/actions/auditActions";
import API from "../../../utils/API";

const LoadBalanza = React.memo(function LoadBalanza() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const audit = useSelector(state => state.audit);
  const user = useSelector(state => state.user);

  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);

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
    API.uploadBalanza({ auditId, file })
      .then(res => {
        // if no errors
        if (res.data.errors) {
          alert(res.data.errors[0].message);
        } else {
          handleClose();
          dispatch(auditActions.addBalanza());
          window.location.reload();
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
          <h3 className="mb-3">Cargar balanza</h3>
          {isUploading ? (
            <div className="d-flex flex-column justify-content-center align-items-center mt-4 mb-3">
              <span className="mb-2">Cargando...</span>
              <Spinner animation="border" />
            </div>
          ) : (
            <React.Fragment>
              <div className="mb-3">
                <input type="file" accept=".csv" onChange={e => loadFile(e)} />
              </div>
              {file ? (
                <Button className="mb-2" variant="primary" onClick={uploadFile}>
                  <i className="fas fa-upload mr-1" />
                  Cargar
                </Button>
              ) : null}
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

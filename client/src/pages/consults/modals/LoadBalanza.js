import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
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
    let auditId = audit.auditId;
    API.uploadBalanza({ auditId, file })
      .then(res => {
        // if no errors
        handleClose();
        dispatch(auditActions.addBalanza());
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return user.role === "Admin" ? (
    <>
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
          <h3>Cargar balanza</h3>
          <input
            className="mt-2"
            type="file"
            accept=".csv"
            onChange={e => loadFile(e)}
          />
          <br />
          <Button
            disabled={file ? false : true}
            className="mt-2"
            variant="primary"
            onClick={uploadFile}
          >
            Cargar
          </Button>
        </Modal.Body>
      </Modal>
    </>
  ) : (
    <p>La balanza no ha sido cargada aún.</p>
  );
});

export default LoadBalanza;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

ModalDeleteClient.propTypes = {
  client: PropTypes.object.isRequired
};

function ModalDeleteClient(props) {
  // modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // user
  const user = useSelector(state => state.user);

  return user.role === "Admin" ? (
    <>
      <Button
        variant="danger"
        size="sm"
        className="shadow-sm"
        onClick={handleShow}
      >
        <i className="fas fa-trash-alt mr-2" />
        Borrar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-light">
          <Modal.Title>
            <h4 className="m-0 p-0">Borrar Cliente</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <p>
            ¿Estás seguro que deseas borrar el cliente{" "}
            <strong>{props.client.name}</strong>?
          </p>
          <p>
            Si lo borras serán también borradas todas las{" "}
            <strong>
              <u>Auditorías</u>
            </strong>{" "}
            asignadas a este Cliente
          </p>
          <p>Esta acción no podrá deshacerse</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <i className="fas fa-ban mr-2" />
            Cancelar
          </Button>
          <Button variant="danger">
            <i className="fas fa-trash-alt mr-2" />
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <OverlayTrigger
      delay={{ show: 250, hide: 400 }}
      placement="left"
      overlay={<Tooltip>Sólo un administrador puede borrar Clientes</Tooltip>}
    >
      <span className="ml-auto">
        <Button
          variant="danger"
          size="sm"
          style={{ pointerEvents: "none" }}
          disabled
        >
          <i className="fas fa-trash-alt mr-2" />
          Borrar
        </Button>
      </span>
    </OverlayTrigger>
  );
}

export default ModalDeleteClient;

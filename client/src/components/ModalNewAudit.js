import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Formik } from "formik";
import API from "../utils/API";

function ModalNewAudit() {
  // modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // clients state
  const [clients, setClients] = useState([]);

  // user
  const user = useSelector(state => state.user);

  useEffect(() => {
    API.fetchClients()
      .then(res => setClients(res.data))
      .catch(err => console.log(err));
  }, []);

  return user.role === "Admin" ? (
    <>
      <Button className="purplebttn shadow-sm ml-auto" onClick={handleShow}>
        Nueva Auditoría
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-light">
          <Modal.Title>
            <h4 className="m-0 p-0">Nueva Auditoría</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Formik
            initialValues={{
              clientAbr: "",
              year: "",
              description: ""
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              const sel = document.getElementById("clientAbreviation");
              values.clientId = sel.getAttribute("clientId");
              API.saveNewAudit(values)
                .then(res => {
                  alert("Auditoría creada con éxito");
                  handleClose();
                  window.location.reload();
                })
                .catch(err => console.log(err));
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <>
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>
                      Cliente
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      name="clientAbr"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as="select"
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Cliente...
                      </option>
                      {clients.length
                        ? clients.map(c => {
                            return (
                              <option
                                id="clientAbreviation"
                                clientid={c.clientId}
                                key={c.clientId}
                              >
                                {c.abbreviation}
                              </option>
                            );
                          })
                        : null}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Año
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="4"
                      placeholder="Año..."
                      type="text"
                      name="year"
                      value={values.year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Descripción
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      maxLength="250"
                      placeholder="Descripción..."
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group className="text-right">
                    <Button
                      className="mr-2"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="purplebttn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Crear
                    </Button>
                  </Form.Group>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  ) : (
    <OverlayTrigger
      delay={{ show: 250, hide: 400 }}
      placement="left"
      overlay={
        <Tooltip>Sólo un administrador puede crear nuevas Auditorías</Tooltip>
      }
    >
      <span className="ml-auto">
        <Button
          className="purplebttn shadow-sm"
          style={{ pointerEvents: "none" }}
          disabled
        >
          Nueva Auditoría
        </Button>
      </span>
    </OverlayTrigger>
  );
}

export default ModalNewAudit;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import API from "../../../utils/API";
import * as yup from "yup";

function ModalNewClient() {
  // modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // user
  const user = useSelector(state => state.user);

  const newClientSchema = yup.object({
    name: yup.string().required("Requerido"),
    abbreviation: yup.string().required("Requerido"),
    rfc: yup
      .string()
      .length(12, "Longitud incorrecta")
      .required("Requerido"),
    address: yup.string()
  });

  return user.role === "Admin" ? (
    <>
      <Button className="purplebttn shadow-sm ml-auto" onClick={handleShow}>
        <i className="fas fa-plus mr-2" />
        Nuevo Cliente
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-light">
          <Modal.Title>
            <h4 className="m-0 p-0">Nuevo Cliente</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Formik
            initialValues={{
              name: "",
              abbreviation: "",
              rfc: "",
              address: ""
            }}
            validationSchema={newClientSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              values.abbreviation = values.abbreviation.toUpperCase();
              values.rfc = values.rfc.toUpperCase();
              API.saveNewClient(values)
                .then(res => {
                  if (res.data.errors) {
                    alert(res.data.errors[0].message);
                    setSubmitting(false);
                  } else {
                    alert("Cliente creado con éxito");
                    handleClose();
                    window.location.reload();
                  }
                })
                .catch(err => alert(err));
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
                      Nombre
                      <small className="text-muted ml-1">(100)</small>
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="100"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="name"
                      component="div"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Abreviatura
                      <small className="text-muted ml-1">(15)</small>
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="15"
                      type="text"
                      name="abbreviation"
                      value={values.abbreviation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ textTransform: "uppercase" }}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="abbreviation"
                      component="div"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      RFC
                      <small className="text-muted ml-1">(12)</small>
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="12"
                      type="text"
                      name="rfc"
                      value={values.rfc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ textTransform: "uppercase" }}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="rfc"
                      component="div"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Dirección
                      <small className="text-muted ml-1">(150)</small>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      maxLength="150"
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="address"
                      component="div"
                    />
                  </Form.Group>
                  <Form.Group className="text-right">
                    <Button
                      className="border-0 mr-2"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      <i className="fas fa-ban mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      className="purplebttn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <i className="fas fa-save mr-2 " />
                      Guardar
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
        <Tooltip>Sólo un administrador puede crear nuevos Clientes</Tooltip>
      }
    >
      <span className="ml-auto">
        <Button
          className="purplebttn shadow-sm"
          style={{ pointerEvents: "none" }}
          disabled
        >
          <i className="fas fa-plus mr-2" />
          Nuevo Cliente
        </Button>
      </span>
    </OverlayTrigger>
  );
}

export default ModalNewClient;

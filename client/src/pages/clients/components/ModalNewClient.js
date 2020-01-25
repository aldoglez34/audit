import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import API from "../../../utils/API";
import * as yup from "yup";

const ModalNewClient = React.memo(function ModalNewClient() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Modal.Body className="bg-light">
          <h3>Nuevo Cliente</h3>
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
              errors,
              touched,
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
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="100"
                      type="text"
                      placeholder="Ingresa el nombre"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
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
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="15"
                      type="text"
                      placeholder="Ingresa la abreviatura"
                      name="abbreviation"
                      value={values.abbreviation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.abbreviation && !errors.abbreviation}
                      isInvalid={touched.abbreviation && !!errors.abbreviation}
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
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="12"
                      type="text"
                      placeholder="Ingresa el RFC"
                      name="rfc"
                      value={values.rfc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.rfc && !errors.rfc}
                      isInvalid={touched.rfc && !!errors.rfc}
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
                      <strong className="ml-1 text-danger">*</strong>
                    </Form.Label>
                    <Form.Control
                      maxLength="250"
                      as="textarea"
                      rows="3"
                      type="text"
                      placeholder="Ingresa la dirección"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.address && !errors.address}
                      isInvalid={touched.address && !!errors.address}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="address"
                      component="div"
                    />
                  </Form.Group>
                  <Form.Group className="text-right">
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
      placement="bottom"
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
});

export default ModalNewClient;

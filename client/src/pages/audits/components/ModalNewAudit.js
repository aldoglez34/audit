import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  Col,
  Spinner
} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import API from "../../../utils/API";
import * as yup from "yup";

const ModalNewAudit = React.memo(function ModalNewAudit() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [clients, setClients] = useState([]);

  const user = useSelector(state => state.user);

  useEffect(() => {
    API.fetchClients()
      .then(res => setClients(res.data))
      .catch(err => console.log(err));
  }, []);

  const yupSchema = yup.object({
    clientIdAndAbbr: yup
      .mixed()
      .notOneOf(["Elige..."], "Requerido")
      .required("Requerido"),
    year: yup
      .string()
      .matches(/^[0-9]*$/, "Formato de año incorrecto")
      .length(4, "Longitud de año incorrecto")
      .required("Requerido"),
    description: yup.string().required("Requerido")
  });

  return user.role === "Admin" ? (
    <>
      <Button className="purplebttn shadow-sm ml-auto" onClick={handleShow}>
        <i className="fas fa-plus mr-2" />
        Nueva Auditoría
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="bg-light">
          <h3>Nueva Auditoría</h3>
          <Formik
            initialValues={{
              clientIdAndAbbr: "Elige...",
              year: "",
              description: ""
            }}
            validationSchema={yupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              API.saveNewAudit(values)
                .then(res => {
                  if (res.data.errors) {
                    alert(res.data.errors[0].message);
                    setSubmitting(false);
                  } else {
                    alert("Auditoría creada con éxito");
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
                  {clients.length ? (
                    <>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>
                            Cliente
                            <strong className="ml-1 text-danger">*</strong>
                          </Form.Label>
                          <Form.Control
                            as="select"
                            type="text"
                            name="clientIdAndAbbr"
                            value={values.clientIdAndAbbr}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              touched.clientIdAndAbbr && !errors.clientIdAndAbbr
                            }
                            isInvalid={
                              touched.clientIdAndAbbr &&
                              !!errors.clientIdAndAbbr
                            }
                          >
                            <option disabled>Elige...</option>
                            {clients.map(c => {
                              return (
                                <option
                                  value={c.clientId + "#" + c.abbreviation}
                                  key={c.clientId}
                                >
                                  {c.abbreviation}
                                </option>
                              );
                            })}
                          </Form.Control>
                          <ErrorMessage
                            className="text-danger"
                            name="clientAbr"
                            component="div"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>
                            Año
                            <strong className="ml-1 text-danger">*</strong>
                          </Form.Label>
                          <Form.Control
                            maxLength="4"
                            type="text"
                            placeholder="Ingresa el año"
                            name="year"
                            value={values.year}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.year && !errors.year}
                            isInvalid={touched.year && !!errors.year}
                          />
                          <ErrorMessage
                            className="text-danger"
                            name="year"
                            component="div"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>
                            Descripción
                            <strong className="ml-1 text-danger">*</strong>
                          </Form.Label>
                          <Form.Control
                            maxLength="250"
                            as="textarea"
                            rows="3"
                            type="text"
                            placeholder="Ingresa la descripción"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.description && !errors.description}
                            isInvalid={
                              touched.description && !!errors.description
                            }
                          />
                          <ErrorMessage
                            className="text-danger"
                            name="description"
                            component="div"
                          />
                        </Form.Group>
                      </Form.Row>
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
                    </>
                  ) : (
                    <div className="text-center mt-4 pt-4">
                      <Spinner animation="border" />
                    </div>
                  )}
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
        <Tooltip>Sólo un administrador puede crear nuevas Auditorías</Tooltip>
      }
    >
      <span className="ml-auto">
        <Button
          className="purplebttn shadow-sm"
          style={{ pointerEvents: "none" }}
          disabled
        >
          <i className="fas fa-plus mr-2" />
          Nueva Auditoría
        </Button>
      </span>
    </OverlayTrigger>
  );
});

export default ModalNewAudit;

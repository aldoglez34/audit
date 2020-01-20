import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./login.scss";
import * as userActions from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import API from "../../utils/API";
import { Formik } from "formik";
import fire from "../../firebase/Fire";
const firebase = require("firebase/app");

function Login() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        // first auth the user in firebase (session persistence)
        fire
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            return fire
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(res => {
                // if anything goes wrong from here, logout the user in firebase
                API.fetchUserInfo(res.user.uid)
                  .then(res => {
                    alert("¡Bienvenido!");
                    dispatch(userActions.setUserInfo(res.data));
                  })
                  .catch(error => {
                    alert("Error de la BD -> " + error);
                    console.log(error);
                    setSubmitting(false);
                  });
              });
          })
          .catch(function(error) {
            alert("Error de Firebase -> " + error.message);
            console.log(error.code);
            setSubmitting(false);
          });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          <Form
            style={{ marginTop: 55 }}
            className="form-signin mt-4 mb-0"
            onSubmit={handleSubmit}
          >
            <h1 id="bigLogo">APAG</h1>
            <h4 className="text-center mt-3" style={{ color: "#99aab5" }}>
              Ingresar
            </h4>
            <Form.Group className="mt-4 mb-0" controlId="email">
              <Form.Control
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="100"
                placeholder="Email"
                className="noglowInput"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Control
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="30"
                placeholder="Contraseña"
                className="noglowInput"
              />
            </Form.Group>
            <Button
              className="btn-lg purplebttn"
              type="submit"
              disabled={isSubmitting}
              block
            >
              Entrar
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default Login;

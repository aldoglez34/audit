import React from "react";
import { Container, Spinner } from "react-bootstrap";

const styles = {
  container: {
    marginTop: 150,
    textAlign: "center",
    color: "rgb(26,26,26)"
  },
  spinner: {
    marginTop: 20,
    fontSize: 150
  }
};

const MySpinner = React.memo(function MySpinner() {
  return (
    <Container style={styles.container}>
      <h1>Cargando...</h1>
      <Spinner animation="border" style={styles.spinner} />
    </Container>
  );
});

export default MySpinner;

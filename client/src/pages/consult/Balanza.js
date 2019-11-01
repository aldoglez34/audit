import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../../redux-actions/navbarActions";
import Layout from "../Layout";
import * as auditActions from "../../redux-actions/auditActions";
// import { Image, Container, Row, Col, Button, Form } from "react-bootstrap";
// import ReactFileReader from 'react-file-reader';
// import ProgressBar from "react-bootstrap/ProgressBar";
// import InputGroup from "react-bootstrap/InputGroup";
// import API from "../../utils/API";

function Balanza() {
  // state = {
  //   loggedUser: null,
  //   selectedAudit: null,
  //   selectedFile: null
  // };

  // // upload files handler
  // chooseFileHandler = event => {
  //   console.log(event.target.files[0]);
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded: 0
  //   });
  // };

  // uploadHandler = e => {
  //   e.preventDefault();
  //   let formData = new FormData();
  //   formData.append("csvFile", this.state.selectedFile);
  //   formData.append("auditId", this.state.selectedAudit.id);
  //   // for (var key of formData.entries()) {
  //   //     console.log(key[0] + ', ' + key[1])
  //   // }
  //   API.uploadBalanza(formData)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Balanza"));
    dispatch(auditActions.setBackBttn(null));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>Balanza</span>
      </h2>
      <hr />
      {audit.hasBalanza ? (
        <span>true</span>
      ) : (
        <span>La Balanza de {audit.name} no está disponible</span>
      )}
      {/* {!this.state.selectedAudit.hasBalanza ? (
          <Container className="mt-4 text-center" fluid>
            <p className="lead">Esta Auditoría no cuenta con una Balanza.</p>
            {this.state.loggedUser.role === "Admin" ? (
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form
                    onSubmit={this.uploadHandler}
                    encType="multipart/form-data"
                  >
                    <Form.Row>
                      <input
                        type="file"
                        name="file"
                        onChange={this.chooseFileHandler}
                      />
                    </Form.Row>
                    <Form.Row className="mt-4">
                      {this.state.selectedFile ? (
                        <Button type="submit" variant="primary">
                          Upload
                        </Button>
                      ) : (
                        <Button type="submit" variant="primary" disabled>
                          Upload
                        </Button>
                      )}
                    </Form.Row>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Button variant="primary" disabled>
                Subir
              </Button>
            )}
          </Container>
        ) : (
          <Container className="mt-4 text-center">
            <p className="lead">Esta Auditoría cuenta con una Balanza</p>
            {/* show the balanza */}
      {/* </Container>
        )} */}
    </Layout>
  ) : null;
}

export default Balanza;

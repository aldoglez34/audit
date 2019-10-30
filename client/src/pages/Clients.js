import React, { Component } from "react";
import { connect } from "react-redux";
import { setHomeActive } from "../redux-actions/navbarActions";
import Layout from "./Layout";
import {
  Button,
  Row,
  Col,
  Spinner,
  ListGroup,
  Form,
  FormControl
} from "react-bootstrap";
import API from "../utils/API";
import ModalNewClient from "../components/ModalNewClient";
import ModalEditClient from "../components/ModalEditClient";
import ModalDeleteClient from "../components/ModalDeleteClient";

class Clients extends Component {
  state = {
    isLoadingClients: true,
    clients: []
  };

  componentDidMount() {
    // show and hide menus
    this.props.setHomeActive("Clientes");
    // fetch clients
    API.fetchClients()
      .then(res => {
        this.setState({ clients: res.data }, () =>
          this.setState({ isLoadingClients: false })
        );
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Layout>
        {/* title */}
        <Row>
          <Col md={8}>
            <h2 className="mb-0">/Clientes</h2>
          </Col>
          <Col className="mt-1 mt-md-0 text-md-right" md={4}>
            <ModalNewClient />
          </Col>
        </Row>
        <hr />
        {/* content */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Buscar Cliente"
                className="mr-sm-2"
              />
              <Button className="purplebttn">
                <i className="fas fa-search" />
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {!this.state.isLoadingClients ? (
              this.state.clients.length ? (
                <ListGroup className="border-0 shadow-sm">
                  {this.state.clients.map(client => {
                    return (
                      <ListGroup.Item
                        key={client.clientId}
                        className="auditItem py-3"
                      >
                        <h4 className="mr-2 mb-0" style={{ color: "#2c2f33" }}>
                          {client.abbreviation}
                        </h4>
                        <p className="mb-0" style={{ color: "#2c2f33" }}>
                          {client.name}
                        </p>
                        <p className="mb-1 text-secondary">
                          {client.createdAt}
                        </p>
                        <ModalEditClient client={client} />
                        <ModalDeleteClient client={client} />
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : (
                <div className="text-center text-muted mt-4">
                  No hay Clientes para mostrar
                </div>
              )
            ) : (
              <div className="text-center mt-4 pt-4">
                <Spinner animation="border" />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center mt-2">
            <span>{this.state.clients.length} Clientes</span>
          </Col>
          <Col className="d-flex align-items-center justify-content-end mt-2">
            {/* <MyPagination
              pageCount={this.state.pageCount}
              activePage={this.state.activePage}
              handleChangePage={this.handleChangePage}
            /> */}
          </Col>
        </Row>
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  setHomeActive
};

export default connect(
  null,
  mapDispatchToProps
)(Clients);

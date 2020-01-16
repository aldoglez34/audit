import React, { Component } from "react";
import { connect } from "react-redux";
import { setHomeActive } from "../../redux/actions/navbarActions";
import Layout from "../Layout";
import {
  Row,
  Col,
  Spinner,
  ListGroup,
  Form,
  FormControl
} from "react-bootstrap";
import API from "../../utils/API";
import ModalNewClient from "./components/ModalNewClient";
import ModalEditClient from "./components/ModalEditClient";
import ModalDeleteClient from "./components/ModalDeleteClient";
import MyPagination from "../../components/MyPagination";
import "./clients.scss";

class Clients extends Component {
  state = {
    isLoadingClients: true,
    clients: [],
    pageCount: 0,
    activePage: 1,
    productsPerPage: 6,
    offset: null,
    limit: null
  };

  componentDidMount() {
    // show and hide menus
    this.props.setHomeActive("Clientes");
    // fetch clients
    API.fetchClients()
      .then(res => {
        let productsPerPage = this.state.productsPerPage;
        this.setState(
          {
            clients: res.data,
            pageCount: Math.ceil(res.data.length / productsPerPage)
          },
          () => {
            this.setOffsetAndLimit();
            this.setState({ isLoadingClients: false });
          }
        );
      })
      .catch(err => console.log(err));
  }

  handleChangePage = page => {
    this.setState({ activePage: page }, () => this.setOffsetAndLimit());
  };

  setOffsetAndLimit() {
    let offset;
    let limit;
    if (this.state.activePage === 1) {
      offset = 0;
      limit = offset + this.state.productsPerPage;
      this.setState({ offset, limit });
    } else {
      offset = (this.state.activePage - 1) * this.state.productsPerPage;
      limit = offset + this.state.productsPerPage;
      this.setState({ offset, limit });
    }
  }

  render() {
    return (
      <Layout>
        {/* title */}
        <Row>
          <Col md={8}>
            <h2 className="mb-0">Clientes</h2>
          </Col>
          <Col className="mt-1 mt-md-0 text-md-right" md={4}>
            <ModalNewClient />
          </Col>
        </Row>
        <hr />
        <Row className="mb-3">
          <Col>
            <Form className="shadow-sm">
              <FormControl type="text" placeholder="Buscar Cliente" />
            </Form>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            {!this.state.isLoadingClients ? (
              this.state.clients.length ? (
                <ListGroup className="border-0 shadow-sm">
                  {this.state.clients
                    .slice(this.state.offset, this.state.limit)
                    .map(client => {
                      return (
                        <ListGroup.Item
                          key={client.clientId}
                          className="auditItem py-3"
                        >
                          <h4
                            className="mr-2 mb-0"
                            style={{ color: "#2c2f33" }}
                          >
                            <i
                              className="fas fa-user-friends mr-2"
                              style={{ fontSize: "17px" }}
                            />
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
          <Col md={3} className="d-flex align-items-center mt-2">
            <em>{this.state.clients.length} Clientes</em>
          </Col>
          <Col
            md={9}
            className="d-flex align-items-center justify-content-end mt-2"
          >
            <MyPagination
              pageCount={this.state.pageCount}
              activePage={this.state.activePage}
              handleChangePage={this.handleChangePage}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  setHomeActive
};

export default connect(null, mapDispatchToProps)(Clients);

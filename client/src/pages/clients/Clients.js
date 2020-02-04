import React, { PureComponent } from "react";
import Layout from "../Layout";
import { Row, Col, Spinner, ListGroup, FormControl } from "react-bootstrap";
import API from "../../utils/API";
import ModalNewClient from "./components/ModalNewClient";
import ModalEditClient from "./components/ModalEditClient";
import ModalDeleteClient from "./components/ModalDeleteClient";
import MyPagination from "../../components/MyPagination";
import SortClientsDropdown from "./components/SortClientsDropdown";

class Clients extends PureComponent {
  state = {
    clients: "",
    //
    productsPerPage: 8,
    pageCount: 0,
    activePage: 1,
    //
    offset: "",
    limit: "",
    //
    activeSort: "Alfabeto ascendente"
  };

  componentDidMount() {
    API.fetchClients()
      .then(res => {
        this.setState(
          {
            clients: res.data,
            pageCount: Math.ceil(res.data.length / this.state.productsPerPage)
          },
          () => this.setOffsetAndLimit()
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
    } else {
      offset = (this.state.activePage - 1) * this.state.productsPerPage;
      limit = offset + this.state.productsPerPage;
    }
    this.setState({ offset, limit });
  }

  handleSorting = sort => {
    this.setState({ activeSort: sort });
    let temp = this.state.clients;
    switch (sort) {
      case "Alfabeto ascendente":
        temp.sort((a, b) =>
          a.abbreviation > b.abbreviation
            ? 1
            : b.abbreviation > a.abbreviation
            ? -1
            : 0
        );
        this.setState({ clients: temp });
        break;
      case "Alfabeto descendente":
        temp.sort((a, b) =>
          a.abbreviation < b.abbreviation
            ? 1
            : b.abbreviation < a.abbreviation
            ? -1
            : 0
        );
        this.setState({ clients: temp });
        break;
      default:
        this.setState({ clients: temp });
    }
  };

  render() {
    return (
      <Layout homeMenu="Clientes">
        {/* title */}
        <div className="d-flex flex-row">
          <h2>Clientes</h2>
          <div className="ml-auto">
            <ModalNewClient />
          </div>
        </div>
        <hr className="myDivider" />
        {this.state.clients ? (
          this.state.clients.length ? (
            <React.Fragment>
              {/* sorting and search bar */}
              <Row className="mb-3 px-3">
                <div className="d-flex flex-row align-items-center">
                  <SortClientsDropdown
                    activeSort={this.state.activeSort}
                    handleSorting={this.handleSorting}
                  />
                </div>
                <div className="d-flex flex-row align-items-center w-25 ml-auto">
                  <i
                    className="fas fa-search mr-2"
                    // style={{ fontSize: "16px" }}
                  />
                  <FormControl type="text" placeholder="Buscar Clientes" />
                </div>
              </Row>
              {/* clients */}
              <ListGroup className="border-0 shadow-sm">
                {this.state.clients
                  .slice(this.state.offset, this.state.limit)
                  .map(c => {
                    return (
                      <ListGroup.Item
                        key={c.clientId}
                        className="bg-white py-3"
                      >
                        <h4 className="mr-2 mb-0" style={{ color: "#2c2f33" }}>
                          <i
                            className="fas fa-user-friends mr-2"
                            style={{ fontSize: "17px" }}
                          />
                          {c.abbreviation}
                        </h4>
                        <p className="mb-0" style={{ color: "#2c2f33" }}>
                          {c.name}
                        </p>
                        <p className="mb-1 text-secondary">{c.createdAt}</p>
                        <ModalEditClient client={c} />
                        <ModalDeleteClient client={c} />
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
              {/* footer */}
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
            </React.Fragment>
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
      </Layout>
    );
  }
}

export default Clients;

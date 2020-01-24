import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { deleteAuditInfo } from "../../redux/actions/auditActions";
import {
  Button,
  Col,
  Row,
  Spinner,
  ListGroup,
  FormControl
} from "react-bootstrap";
import Layout from "../Layout";
import API from "../../utils/API";
import ModalNewAudit from "./components/ModalNewAudit";
import FilterByClientDropdown from "./components/FilterByClientDropdown";
import SortAuditsDropdown from "./components/SortAuditsDropdown";
import MyPagination from "../../components/MyPagination";
import "./components/dropdowns.scss";

class Audits extends PureComponent {
  state = {
    audits: "",
    uniqueClients: [],
    //
    productsPerPage: 8,
    pageCount: 0,
    activePage: 1,
    //
    offset: "",
    limit: "",
    //
    activeFilter: "Sin filtros",
    activeSort: "Alfabeto ascendente"
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

  componentDidMount() {
    // fetch unique clients (for client filters)
    API.fetchUniqueClients()
      .then(res => this.setState({ uniqueClients: res.data }))
      .catch(err => console.log(err));
    // delete info from whatever audit is open
    this.props.deleteAuditInfo();
    // fetch audits
    API.fetchAudits()
      .then(res => {
        // no filters
        if (!this.props.routeProps.match.params.client) {
          this.setState(
            {
              audits: res.data,
              pageCount: Math.ceil(res.data.length / this.state.productsPerPage)
            },
            () => this.setOffsetAndLimit()
          );
        }
        // client filter
        if (this.props.routeProps.match.params.client) {
          this.setState({
            activeFilter: this.props.routeProps.match.params.client
          });
          let filteredAudits = res.data.filter(
            a =>
              a.Client.abbreviation ===
              this.props.routeProps.match.params.client
          );
          this.setState(
            {
              audits: filteredAudits,
              pageCount: Math.ceil(
                filteredAudits.length / this.state.productsPerPage
              )
            },
            () => this.setOffsetAndLimit()
          );
        }
      })
      .catch(err => console.log(err));
  }

  handleChangePage = page => {
    this.setState({ activePage: page }, () => this.setOffsetAndLimit());
  };

  handleSorting = sort => {
    this.setState({ activeSort: sort });
    let temp = this.state.audits;
    switch (sort) {
      case "Alfabeto ascendente":
        temp.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        this.setState({ audits: temp });
        break;
      case "Alfabeto descendente":
        temp.sort((a, b) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0));
        this.setState({ audits: temp });
        break;
      case "Año ascendente":
        temp.sort((a, b) => (a.year > b.year ? 1 : b.year > a.year ? -1 : 0));
        this.setState({ audits: temp });
        break;
      case "Año descendente":
        temp.sort((a, b) => (a.year < b.year ? 1 : b.year < a.year ? -1 : 0));
        this.setState({ audits: temp });
        break;
      case "Última actualización":
        temp.sort((a, b) =>
          a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
        );
        this.setState({ audits: temp });
        break;
      default:
        this.setState({ audits: temp });
    }
  };

  render() {
    return (
      <Layout homeMenu={"Auditorías"}>
        {/* title */}
        <Row>
          <Col md={8}>
            <h2>Auditorías</h2>
            <hr className="myDivider" />
          </Col>
          <Col md={4} className="mt-1 mt-md-0 text-md-right">
            <ModalNewAudit />
          </Col>
        </Row>
        {this.state.audits && this.state.uniqueClients ? (
          <>
            {/* search bar and filters */}
            <Row className="mb-3 px-3">
              <div className="d-flex flex-row align-items-center">
                <FilterByClientDropdown
                  uniqueClients={this.state.uniqueClients}
                  activeFilter={this.state.activeFilter}
                />
              </div>
              <div className="d-flex flex-row align-items-center ml-4">
                <SortAuditsDropdown
                  activeSort={this.state.activeSort}
                  handleSorting={this.handleSorting}
                />
              </div>
              <div className="d-flex flex-row align-items-center w-25 ml-auto">
                <i
                  className="fas fa-search mr-2"
                  style={{ fontSize: "16px" }}
                />
                <FormControl type="text" placeholder="Buscar Auditoría" />
              </div>
            </Row>
            {/* audits */}
            <Row className="mt-2">
              <Col>
                {this.state.audits.length && this.state.uniqueClients.length ? (
                  <ListGroup className="border-0 shadow-sm">
                    {this.state.audits
                      .slice(this.state.offset, this.state.limit)
                      .map(a => {
                        return (
                          <ListGroup.Item
                            key={a.auditId}
                            className="bg-white py-3"
                          >
                            <h4
                              className="mr-2 mb-0"
                              style={{ color: "#2c2f33" }}
                            >
                              <i
                                className="fas fa-project-diagram mr-2"
                                style={{ fontSize: "17px" }}
                              />
                              {a.name}
                            </h4>
                            <p className="mb-0" style={{ color: "#2c2f33" }}>
                              {a.description}
                            </p>
                            <p className="mb-1 text-secondary">{a.updatedAt}</p>
                            <Button
                              className="purplebttn shadow-sm"
                              size="sm"
                              href={"/audit/home/" + a.auditId}
                            >
                              <i className="fas fa-door-open mr-2" />
                              Abrir
                            </Button>
                          </ListGroup.Item>
                        );
                      })}
                  </ListGroup>
                ) : (
                  <div className="text-center text-muted mt-4">
                    No hay Auditorías para mostrar
                  </div>
                )}
              </Col>
            </Row>
            {/* footer */}
            <Row>
              <Col md={3} className="d-flex align-items-center mt-2">
                <em>{this.state.audits.length} Auditorías</em>
              </Col>
              <Col md={9} className="d-flex justify-content-end mt-2">
                <MyPagination
                  pageCount={this.state.pageCount}
                  activePage={this.state.activePage}
                  handleChangePage={this.handleChangePage}
                />
              </Col>
            </Row>
          </>
        ) : (
          <div className="text-center mt-4 pt-4">
            <Spinner animation="border" />
          </div>
        )}
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  deleteAuditInfo
};

export default connect(null, mapDispatchToProps)(Audits);

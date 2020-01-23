import React, { Component } from "react";
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

class Audits extends Component {
  state = {
    //
    audits: [],
    //
    uniqueClients: [],
    //
    isLoadingAudits: true,
    allAudits: [],
    filteredAudits: [],
    //
    activeClient: "Todos los Clientes",
    //
    pageCount: 0,
    activePage: 1,
    productsPerPage: 8,
    //
    offset: null,
    limit: null,
    //
    sortingTitle: "Orden alfabético A-Z"
  };

  componentDidMount() {
    // delete info from whatever audit is open
    this.props.deleteAuditInfo();
    // fetch audits
    API.fetchAudits()
      .then(res => {
        // allAudits is gonna be used to store all the audits
        // filteredAudits shown is gonna be used for filter purposes
        let productsPerPage = this.state.productsPerPage;
        this.setState(
          {
            allAudits: res.data,
            filteredAudits: res.data,
            pageCount: Math.ceil(res.data.length / productsPerPage)
          },
          () => {
            this.setOffsetAndLimit();
            this.setState({ isLoadingAudits: false });
          }
        );
      })
      .catch(err => console.log(err));
    // fetch unique clients (for client filters)
    API.fetchUniqueClients()
      .then(res => this.setState({ uniqueClients: res.data }))
      .catch(err => console.log(err));
  }

  handleFilterByClient = client => {
    // first, save allAudits and productsPerPage in consts so i can use them
    const allAudits = this.state.allAudits;
    const productsPerPage = this.state.productsPerPage;
    // if the filter is "Todos los Clientes"
    if (client === "Todos los Clientes") {
      // assign allAudits to filteredAudits and calculate the pageCount using the allAudits length
      this.setState({
        activeClient: client,
        filteredAudits: allAudits,
        pageCount: Math.ceil(allAudits.length / productsPerPage)
      });
    } else {
      // if not, filter allAudits and save them in a "temp" array
      let temp = this.state.allAudits.filter(a => {
        return a.Client.abbreviation === client;
      });
      // assign temp array to filteredAudits (which is the array that is shown in the DOM)
      // then calculate pageCount using the temp array
      this.setState({
        activeClient: "Sólo " + client,
        filteredAudits: temp,
        pageCount: Math.ceil(temp.length / productsPerPage)
      });
    }
  };

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

  handleSorting = sort => {
    // take the value of filteredAudits from the state
    let sortedAudits = this.state.filteredAudits;
    // then after setting the dropdown title, sort the array accordingly
    this.setState({ sortingTitle: sort }, () => {
      switch (this.state.sortingTitle) {
        case "Orden alfabético A-Z":
          sortedAudits.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Orden alfabético Z-A":
          sortedAudits.sort((a, b) =>
            a.name < b.name ? 1 : b.name < a.name ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Orden por año A-Z":
          sortedAudits.sort((a, b) =>
            a.year > b.year ? 1 : b.year > a.year ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Orden por año Z-A":
          sortedAudits.sort((a, b) =>
            a.year < b.year ? 1 : b.year < a.year ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Última actualización":
          sortedAudits.sort((a, b) =>
            a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        default:
        // do nothing
      }
    });
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
        {/* search bar and filters */}
        <Row className="mb-3 px-3">
          <div className="d-flex flex-row align-items-center">
            <FilterByClientDropdown
              data={this.state.allAudits}
              activeClient={this.state.activeClient}
              handleFilterByClient={this.handleFilterByClient}
            />
          </div>
          <div className="d-flex flex-row align-items-center ml-4">
            <SortAuditsDropdown
              title={this.state.sortingTitle}
              handleSorting={this.handleSorting}
            />
          </div>
          <div className="d-flex flex-row align-items-center w-25 ml-auto">
            <i className="fas fa-search mr-1" style={{ fontSize: "16px" }} />
            <FormControl type="text" placeholder="Buscar Auditoría" />
          </div>
        </Row>
        {/* audits */}
        <Row className="mt-2">
          <Col>
            {!this.state.isLoadingAudits ? (
              this.state.filteredAudits.length ? (
                <ListGroup className="border-0 shadow-sm">
                  {this.state.filteredAudits
                    .slice(this.state.offset, this.state.limit)
                    .map(audit => {
                      return (
                        <ListGroup.Item
                          key={audit.auditId}
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
                            {audit.name}
                          </h4>
                          <p className="mb-0" style={{ color: "#2c2f33" }}>
                            {audit.description}
                          </p>
                          <p className="mb-1 text-secondary">
                            {audit.updatedAt}
                          </p>
                          <Button
                            className="purplebttn shadow-sm"
                            size="sm"
                            href={"/audit/home/" + audit.auditId}
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
              )
            ) : (
              <div className="text-center mt-4 pt-4">
                <Spinner animation="border" />
              </div>
            )}
          </Col>
        </Row>
        {/* footer */}
        <Row>
          <Col md={3} className="d-flex align-items-center mt-2">
            <em>{this.state.allAudits.length} Auditorías</em>
          </Col>
          <Col md={9} className="d-flex justify-content-end mt-2">
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
  deleteAuditInfo
};

export default connect(null, mapDispatchToProps)(Audits);

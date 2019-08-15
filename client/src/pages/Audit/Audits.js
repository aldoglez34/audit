import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";
import API from "../../utils/API";

class Audits extends Component {
  state = {
    loggedUser: null,
    audits: [],
    clients: null,
    // alerts
    showAlert: false,
    alertVariant: null,
    alertHeading: null,
    alertBody: null,
    // create audit modal
    showModal: false,
    //pagination
    totalPages: 1,
    activePage: 1
  };

  // modal arrow functions
  handleCloseModal = () => this.setState({ showModal: false });
  handleShowModal = () => this.loadClientsAndShowModal();
  handleFormSubmit = event => {
    event.preventDefault();
    const sel = document.getElementById("dropdownClient");
    const opt = sel.options[sel.selectedIndex];
    let clientName = opt.getAttribute("clientName");
    let clientAcronym = opt.text;
    let year = document.getElementById("year").value;
    let description = document.getElementById("description").value;
    let newAudit = {
      clientName: clientName,
      clientAcronym: clientAcronym,
      year: year,
      description: description
    };
    API.saveNewAudit(newAudit)
      .then(res => {
        this.handleShowAlert(
          "success",
          "Éxito.",
          "La Auditoría ha sido creada satisfactoriamente."
        );
        this.loadAudits();
        this.handleCloseModal();
      })
      .catch(err => console.log(err));
  };

  // alert arrow functions
  handleShowAlert = (variant, heading, body) => {
    this.setState(
      { alertVariant: variant, alertHeading: heading, alertBody: body },
      () => this.setState({ showAlert: true })
    );
    // this.setState.myalert({ variant: variant, heading: heading, body: body, show: true });
  };
  handleCloseAlert = () => this.setState({ showAlert: false });

  // Loads all audits and sets them to this.state.audits
  loadAudits = () => {
    let page = 1;
    API.getAllAudits(page)
      .then(res => {
        this.setState({
          audits: res.data.audits,
          totalPages: res.data.totalPages
        });
      })
      .catch(err => console.log(err));
  };

  // Loads all clients and sets them to this.state.clients
  // if there are no clients, close the modal
  loadClientsAndShowModal = () => {
    API.getAllClients()
      .then(res => {
        // if there are no clients, show alert
        if (!res.data.length) {
          this.handleShowAlert(
            "danger",
            "No hay Clientes registrados.",
            "Para crear una Auditoría es necesario crear un Cliente primero."
          );
        }
        // if there are clients, show modal
        else {
          this.setState({ clients: res.data, showModal: true });
        }
      })
      .catch(err => console.log(err));
  };

  // authenticates user and load his/her audits
  authUserAndLoadAudits = () => {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            this.loadAudits();
          });
        })
        .catch(err => console.log(err));
    }
    // if there IS a user in the localstorage
    // log that one
    else if (localStorage.getItem("user")) {
      const uid = localStorage.getItem("user");
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            this.loadAudits();
          });
        })
        .catch(err => console.log(err));
    }
  };

  //cheks if user is an admin
  isUserAdmin = () => {
    if (this.state.loggedUser.role === "Admin") {
      return true;
    } else {
      return false;
    }
  };

  //
  setPages = () => {
    let pagination = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      pagination.push(
        <Pagination.Item key={i} active={i === this.state.activePage}>
          {i}
        </Pagination.Item>
      );
    }
    return pagination;
  };

  componentDidMount() {
    this.authUserAndLoadAudits();
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser) {
      return <MySpinner />;
    }

    // there is user data
    return (
      // layout
      <Layout
        userProps={{
          user:
            this.state.loggedUser.firstName +
            " " +
            this.state.loggedUser.lastName,
          role: this.state.loggedUser.role
        }}
        menuProps={[
          { text: "Tablero", link: "/dashboard" },
          { text: "Auditorías", link: "/audits" },
          { text: "Clientes", link: "/clients" }
        ]}
      >
        {/* breadcrum */}
        <MyBreadcrum
          pages={[
            { key: "1", page: "Auditorías", link: "/audits" },
            { key: "2", page: "Mis Auditorías", link: "nolink" }
          ]}
        />

        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201558.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">Mis Auditorías</h2>
        </div>

        {/* modal */}
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Auditoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>1. Cliente*</Form.Label>
                <Form.Control as="select" id="dropdownClient">
                  {this.state.clients ? (
                    this.state.clients.map(client => {
                      return (
                        <option
                          clientname={client.name}
                          key={client.name}
                          id="optionClients"
                        >
                          {client.acronym}
                        </option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>2. Ejercicio*</Form.Label>
                <Form.Control type="text" id="year" />
              </Form.Group>
              <Form.Group>
                <Form.Label>3. Descripción*</Form.Label>
                <Form.Control as="textarea" rows="3" id="description" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleFormSubmit}>
              Crear
            </Button>
          </Modal.Footer>
        </Modal>

        {/* alert */}
        <Alert
          show={this.state.showAlert}
          variant={this.state.alertVariant}
          onClose={this.handleCloseAlert}
          dismissible
        >
          <Alert.Heading>{this.state.alertHeading}</Alert.Heading>
          <p>{this.state.alertBody}</p>
        </Alert>

        {/* if there are audits */}
        {this.state.audits.length ? (
          <>
            {/* filters */}
            <Row>
              {/* filters */}
              <Col sm={8}>
                <Form>
                  <Form.Group>
                    <Form.Control as="select">
                      <option>Todos los Clientes</option>
                      <option>SEV</option>
                      <option>CONTRALORÍA</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
              {/* pagination> */}
              <Col sm={4} className="d-flex justify-content-center flex-wrap">
                <Pagination>{this.setPages()}</Pagination>
              </Col>
            </Row>

            {/* my audits */}
            <ListGroup>
              {this.state.audits.map(audit => {
                return (
                  <ListGroup.Item
                    action
                    key={audit.id}
                    href={"/audits/workplan/" + audit.id}
                  >
                    <strong className="h3 mr-2" style={{ fontWeight: 600 }}>
                      {audit.clientAcronym}
                    </strong>
                    <span className="h3">{audit.year}</span>
                    <p className="mb-0">{audit.description}</p>
                    <small>Last updated 3 mins ago</small>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>

            {/* conditional rendering, checks if the user is an Admin */}
            {this.isUserAdmin() ? (
              <>
                <div className="text-right mt-3">
                  <Button variant="primary" onClick={this.handleShowModal}>
                    Nueva Auditoría
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-right mt-3">
                  <Button variant="primary" disabled>
                    Nueva Auditoría
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          // if there are no audits
          <>
            <div className="text-center mt-4">
              <p className="lead">No hay Auditorías para mostrar.</p>
              {/* if the user is not an admin, show the new audit button disabled */}
              {this.isUserAdmin() ? (
                <Button variant="primary" onClick={this.handleShowModal}>
                  Nueva Auditoría
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  Nueva Auditoría
                </Button>
              )}
            </div>
          </>
        )}
      </Layout>
    );
  }
}

export default Audits;

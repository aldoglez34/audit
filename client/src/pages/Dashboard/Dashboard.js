import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import axios from "axios";

class Dashboard extends Component {
  state = {
    loggedUser: null,
    audits: []
  };

  // Loads all books  and sets them to this.state.books
  loadAudits = () => {
    axios
      .get("/api/audit/all")
      .then(res => {
        this.setState({ audits: res.data });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      axios
        .get("/api/user/" + uid)
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
      axios
        .get("/api/user/" + uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            this.loadAudits();
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser) {
      return <Spinner animation="border" />;
    }

    // there is user data
    return (
      <Layout
        user={
          this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName
        }
        role={this.state.loggedUser.role}
      >
        <MyBreadcrum
          pages={[
            { page: "Dashboard", link: "/dashboard" },
            { page: "Overview", link: "nolink" }
          ]}
        />
        <h1>Dashboard</h1>
        <hr />
        <p className="lead">Welcome to the Audit Assistant!</p>
        <p className="lead">
          Here are all the audits that are visible to you:{" "}
        </p>

        {this.state.audits.length ? (
          <>
            <ListGroup>
              {this.state.audits.map(audit => {
                return (
                  <ListGroup.Item
                    action
                    key={audit.aid}
                    href={"/audit/" + audit.aid}
                  >
                    <strong className="h4">
                      {audit.clientAcronym} {audit.year}
                    </strong>
                    <p className="mb-0 text-muted">{audit.clientName}</p>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <div className="text-right mt-2">
              <Button variant="primary" href="/dashboard">
                New Audit
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="lead">No Audits to display</p>
            <p className="lead">
              Create a new Audit <a href="/dashboard">here</a>
            </p>
          </>
        )}
      </Layout>
    );
  }
}

export default Dashboard;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as auditActions from "../../redux/actions/auditActions";
import API from "../../utils/API";
import { Card, CardColumns } from "react-bootstrap";
import Layout from "../Layout";

const AuditHome = React.memo(function AuditHome(props) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  useEffect(() => {
    API.fetchOneAudit(props.routeProps.match.params.auditId)
      .then(res => {
        // save data to redux
        dispatch(auditActions.setAuditInfo(res.data));
        // register visit
        API.postVisit({
          auditId: res.data.auditId,
          userId: user.userId
        }).catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout auditMenu="Inicio">
      <h2>
        <span>Inicio</span>
      </h2>
      <hr className="myDivider" />
      <CardColumns>
        <Card>
          <Card.Img
            variant="top"
            src="https://i5.walmartimages.com/dfw/4ff9c6c9-513e/k2-_8db4ce49-0b05-40d3-a44e-cde6551f8a87.v1.jpg"
          />
          <Card.Body>
            <Card.Title>Work Harder.</Card.Title>
            <Card.Text>
              Push yourself, because no one else is going to do it for you.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="p-3">
          <blockquote className="blockquote mb-0 card-body">
            <p>All money is a matter of belief.</p>
            <footer className="blockquote-footer">
              <small className="text-muted text-light">Adam Smith</small>
            </footer>
          </blockquote>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://emeraldfinancialpartners.com/wp-content/uploads/2019/03/office.jpg"
          />
          <Card.Body>
            <Card.Text>
              If it doesn't challenge you, it won't change you.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Don't quit.</small>
          </Card.Footer>
        </Card>
        <Card bg="info" text="white" className="text-center p-3">
          <blockquote className="blockquote mb-0 card-body">
            <p>Pressure makes diamonds.</p>
            <footer className="blockquote-footer">
              <small className="text-light">George S. Patton Jr.</small>
            </footer>
          </blockquote>
        </Card>
        <Card className="text-center">
          <Card.Body>
            <Card.Text>Think outside the box.</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img src="https://www.htcrm.com/wp-content/uploads/2016/05/Consulting-and-Design-Houston-800x533.jpg" />
        </Card>
        <Card className="text-right">
          <blockquote className="blockquote mb-0 card-body">
            <p>Small changes eventually lead to huge results.</p>
            <footer className="blockquote-footer">
              <small className="text-muted">Someone famous</small>
            </footer>
          </blockquote>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>What is an audit?</Card.Title>
            <Card.Text>
              An audit is a systematic and independent examination of books,
              accounts, statutory records, documents and vouchers of an
              organization to ascertain how far the financial statements as well
              as non-financial disclosures present a true and fair view of the
              concern.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardColumns>
    </Layout>
  );
});

export default AuditHome;

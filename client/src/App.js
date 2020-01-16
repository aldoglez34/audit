import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "./redux/actions/userActions";
import fire from "./firebase/Fire";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./pages/login/Login";
import AuditHome from "./pages/auditHome/AuditHome";
import Audits from "./pages/audits/Audits";
import Clients from "./pages/clients/Clients";
import Details from "./pages/details/Details";
import Planning from "./pages/planning/Planning";
import Execution from "./pages/execution/Execution";
import Reporting from "./pages/reporting/Reporting";
import Followup from "./pages//followUp/Followup";
import Nomina from "./pages/consults/Nómina";
import Balanza from "./pages/consults/Balanza";
import CCI from "./pages/planning/surveys/CCI";
import CEFS from "./pages/planning/surveys/CEFS";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    // auth listener
    fire.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(userActions.logoutUser());
      }
    });
  }, []);

  return (
    <Router>
      {!user.isLogged ? (
        // this happens if user is NOT logged
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      ) : (
        // this happens if user IS logged
        <Switch>
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/audits" component={Audits} />
          <Route
            exact
            path="/audit/home/:auditId"
            render={props => <AuditHome routeProps={props} />}
          />
          <Route
            exact
            path="/audit/details/:auditId"
            render={props => <Details routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/:auditId"
            render={props => <Planning routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/cci/:auditId"
            render={props => <CCI routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/cefs/:auditId"
            render={props => <CEFS routeProps={props} />}
          />
          <Route
            exact
            path="/audit/execution/:auditId"
            render={props => <Execution routeProps={props} />}
          />
          <Route
            exact
            path="/audit/reporting/:auditId"
            render={props => <Reporting routeProps={props} />}
          />
          <Route
            exact
            path="/audit/followup/:auditId"
            render={props => <Followup routeProps={props} />}
          />
          <Route
            exact
            path="/audit/nómina/:auditId"
            render={props => <Nomina routeProps={props} />}
          />
          <Route
            exact
            path="/audit/balanza/:auditId"
            render={props => <Balanza routeProps={props} />}
          />
          <Redirect from="/" to="/audits" />
        </Switch>
      )}
    </Router>
  );
}

export default App;

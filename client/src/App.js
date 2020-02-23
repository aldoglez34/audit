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
// pages
import Login from "./pages/login/Login";
import Clients from "./pages/clients/Clients";
import Audits from "./pages/audits/Audits";
import AuditHome from "./pages/auditHome/AuditHome";
// planning
import Planning from "./pages/planning/Planning";
import Survey from "./pages/planning/components/Survey";
import Amdg from "./pages/planning/reports/amdg/Amdg";
import Ads from "./pages/planning/reports/ads/Ads";
// consult
import Balanza from "./pages/consults/balanza/Balanza";

function App() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  useEffect(() => {
    // firebase listener
    fire.auth().onAuthStateChanged(u => {
      if (!u) {
        dispatch(userActions.deleteUserInfo());
      }
    });
  }, []);

  return (
    <Router>
      {!user.isLogged ? (
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/clients" component={Clients} />
          <Route
            exact
            path="/audits"
            render={props => <Audits routeProps={props} />}
          />
          <Route
            exact
            path="/audits/:client"
            render={props => <Audits routeProps={props} />}
          />
          <Route
            exact
            path="/audit/home/:auditId"
            render={props => <AuditHome routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/:auditId/:tab"
            render={props => <Planning routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/survey/:auditId/:surveyTitle"
            render={props => <Survey routeProps={props} />}
          />
          {/* reportes */}
          <Route
            exact
            path="/audit/planning/report/ads/:auditId"
            component={Ads}
          />
          <Route
            exact
            path="/audit/planning/report/amdg/:auditId"
            component={Amdg}
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

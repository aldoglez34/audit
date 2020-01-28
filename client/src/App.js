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
import Planning from "./pages/planning/Planning";
import Balanza from "./pages/consults/Balanza";
import Surveys from "./pages/planning/components/Surveys";
// import CCI from "./pages/planning/surveys/CCI";
// import CEFS from "./pages/planning/surveys/CEFS";

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
            path="/audit/planning/:auditId"
            render={props => <Planning routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/survey/:auditId/:surveyTitle"
            render={props => <Surveys routeProps={props} />}
          />
          {/* <Route
            exact
            path="/audit/planning/cci/:auditId"
            render={props => <CCI routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/cefs/:auditId"
            render={props => <CEFS routeProps={props} />}
          /> */}
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

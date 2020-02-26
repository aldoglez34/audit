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
import Ads from "./pages/planning/reports/ads/Ads";
import Csdsc from "./pages/planning/reports/csdsc/Csdsc";
import Amds from "./pages/planning/reports/amds/Amds";
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
            path="/audit/planning/:tab"
            render={props => <Planning routeProps={props} />}
          />
          <Route
            exact
            path="/audit/planning/survey/:surveyTitle"
            render={props => <Survey routeProps={props} />}
          />
          {/* planning reports */}
          <Route exact path="/audit/planning/report/ads" component={Ads} />
          <Route exact path="/audit/planning/report/csdsc" component={Csdsc} />
          <Route exact path="/audit/planning/report/amds" component={Amds} />
          {/* consult */}
          <Route exact path="/audit/balanza" component={Balanza} />
          <Redirect from="/" to="/audits" />
        </Switch>
      )}
    </Router>
  );
}

export default App;

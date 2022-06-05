import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as Routes from "./constants/Routes";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import AuthContext from "./contexts/AuthContext";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";

import { AuthenticatedUser } from "./types/AuthTypes";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Intake from "./components/pages/IntakePage";
import Visit from "./components/pages/VisitPage";
import Home from "./components/pages/HomePage";
import NotFound from "./components/pages/NotFound";

// import PrivateRoute from "./components/auth/PrivateRoute";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser>(currentUser);

  // Some sort of global state. Context API replaces redux.
  // Split related states into different contexts as necessary.
  // Split dispatcher and state into separate contexts as necessary.
  const [sampleContext, dispatchSampleContextUpdate] = useReducer(
    sampleContextReducer,
    DEFAULT_SAMPLE_CONTEXT,
  );

  return (
    <SampleContext.Provider value={sampleContext}>
      <SampleContextDispatcherContext.Provider
        value={dispatchSampleContextUpdate}
      >
        <AuthContext.Provider
          value={{ authenticatedUser, setAuthenticatedUser }}
        >
          <Router>
            <Switch>
              <Route exact path={Routes.LOGIN_PAGE} component={Login} />
              <Route exact path={Routes.SIGNUP_PAGE} component={Signup} />
              {/* TODO: Change these to private routes */}
              <Route exact path={Routes.HOME_PAGE} component={Home} />
              <Route exact path={Routes.INTAKE_PAGE} component={Intake} />
              <Route exact path={Routes.VISIT_PAGE} component={Visit} />

              <Route exact path="*" component={NotFound} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      </SampleContextDispatcherContext.Provider>
    </SampleContext.Provider>
  );
};

export default App;

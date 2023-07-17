import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/eczar/700.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";

import * as Routes from "./constants/Routes";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import AuthContext from "./contexts/AuthContext";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";

import customTheme from "./theme";

import { AuthenticatedUser } from "./types/AuthTypes";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Intake from "./components/pages/IntakePage";
import Visit from "./components/pages/VisitPage";
import Home from "./components/pages/HomePage";
import NotFound from "./components/pages/NotFound";
import Cases from "./components/pages/CasesPage";
import { IntakeValueProvider } from "./contexts/IntakeValueContext";
import CaseOverview from "./components/pages/CaseOverview";
import CasesContext, { DEFAULT_CASES_CONTEXT } from "./contexts/CasesContext";
import casesContextReducer from "./reducers/CasesReducer";
import CasesDispatcherContext from "./contexts/CasesDispatcherContext";

// import PrivateRoute from "./components/auth/PrivateRoute";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(
    currentUser,
  );

  // Some sort of global state. Context API replaces redux.
  // Split related states into different contexts as necessary.
  // Split dispatcher and state into separate contexts as necessary.
  const [casesContext, dispatchCasesContextUpdate] = useReducer(
    casesContextReducer,
    DEFAULT_CASES_CONTEXT,
  );

  return (
    <ChakraProvider theme={customTheme}>
      <CasesContext.Provider value={casesContext}>
        <CasesDispatcherContext.Provider value={dispatchCasesContextUpdate}>
          <AuthContext.Provider
            value={{ authenticatedUser, setAuthenticatedUser }}
          >
            <Router>
              <IntakeValueProvider>
                <Switch>
                  <Route exact path={Routes.LOGIN_PAGE} component={Login} />
                  <Route exact path={Routes.SIGNUP_PAGE} component={Signup} />
                  {/* TODO: Change these to private routes */}
                  <Route exact path={Routes.HOME_PAGE} component={Home} />
                  <Route exact path={Routes.INTAKE_PAGE} component={Intake} />
                  <Route exact path={Routes.VISIT_PAGE} component={Visit} />
                  <Route
                    exact
                    path={Routes.CASEOVERVIEW_PAGE}
                    component={CaseOverview}
                  />
                  <Route exact path={Routes.CASES_PAGE} component={Cases} />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </IntakeValueProvider>
            </Router>
          </AuthContext.Provider>
        </CasesDispatcherContext.Provider>
      </CasesContext.Provider>
    </ChakraProvider>
  );
};

export default App;

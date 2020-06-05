import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/error-mgt/errorBoundary";
import {
  CatchTrainRoutes,
  SettingsPage,
  StartPage,
  SelectJourneyPage,
  SelectTravelDurationPage,
  SelectAccessDurationPage,
  SelectPreferencePage,
} from "./components/pages";
import AppTitle from "./components/appBar/appTitle";
import { colors } from "./design/colors";
import store from "./store";
import ApplicationCover from "./components/applicationCover";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <Page>
            <Switch>
              <Route path="/start">
                <AppTitle title="" />
                <StartPage />
              </Route>
              <Route path="/settings">
                <AppTitle title="Paramètres" />
                <SettingsPage />
              </Route>
              <Route path="/select-journey">
                <AppTitle title="Choix du train" />
                <SelectJourneyPage />
              </Route>
              <Route path="/select-travel-duration">
                <SelectTravelDurationPage />
              </Route>{" "}
              <Route path="/select-access-duration">
                <AppTitle title="Temps d'accès au quai" />
                <SelectAccessDurationPage />
              </Route>
              <Route path="/preferences">
                <AppTitle title="Préférences" />
                <SelectPreferencePage />
              </Route>
              <Route path="/next-train">
                <AppTitle title="Prochains trains" />
                <CatchTrainRoutes />
              </Route>
              <Route path="/cover">
                <ApplicationCover />
              </Route>
              <Redirect to="/start" />
            </Switch>
          </Page>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

const Page = styled.div`
  background: ${() => colors.dark.background};
  color: ${() => colors.dark.text.normal};
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export default App;

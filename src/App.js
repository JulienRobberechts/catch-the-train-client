import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/error-mgt/errorBoundary";
import {
  CatchTrainRoutes,
  SettingsPage,
  StartPage,
  SelectJourneyPage,
  SelectPreferencePage,
} from "./components/pages";
import AppTitle from "./components/appBar/appTitle";
import { colors } from "./design/colors";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <Page>
            <Switch>
              <Route path="/start">
                <AppTitle />
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
              <Route path="/preferences">
                <AppTitle title="Préférences" />
                <SelectPreferencePage />
              </Route>
              <Route path="/">
                <AppTitle title="Prochains train" />
                <CatchTrainRoutes />
              </Route>
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

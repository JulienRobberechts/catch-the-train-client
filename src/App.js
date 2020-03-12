import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import ErrorBoundary from "./components/error-mgt/errorBoundary";
import { CatchTrainPage, SettingsPage } from "./components/pages";
import AppTitle from "./components/appBar/appTitle";
import { colors } from "./design/colors";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Page>
          <AppTitle />
          <Switch>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/" exact>
              <CatchTrainPage />
            </Route>
          </Switch>
        </Page>
      </ErrorBoundary>
    </Router>
  );
}

const Page = styled.div`
  background: ${() => colors.dark.background};
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export default App;

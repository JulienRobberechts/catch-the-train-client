import React from "react";
import CatchPage from "./components/catch/page";
import Attributions from "./components/attributions/attribution";
import ErrorBoundary from "./components/error-mgt/errorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <CatchPage />
      <Attributions />
    </ErrorBoundary>
  );
}

export default App;

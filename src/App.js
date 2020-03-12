import React from "react";
import CatchTrainPage from "./components/catchTrainPage/index.js";
import ErrorBoundary from "./components/error-mgt/errorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <CatchTrainPage />
    </ErrorBoundary>
  );
}

export default App;

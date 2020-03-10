import React from "react";
import CatchPage from "./components/catch/page";
import ErrorBoundary from "./components/error-mgt/errorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <CatchPage />
    </ErrorBoundary>
  );
}

export default App;

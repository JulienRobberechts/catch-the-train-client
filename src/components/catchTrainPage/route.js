import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CatchPage from "./page";

const CatchTrainRoutes = () => {
  console.log("CatchTrainRoutes");
  return (
    <Switch>
      <Route path="/:station/:dest/:departure">
        <CatchPage />
      </Route>
      <Redirect path="/settings" />
    </Switch>
  );
};

export default CatchTrainRoutes;

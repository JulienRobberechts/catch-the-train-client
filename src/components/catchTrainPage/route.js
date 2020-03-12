import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CatchPage from "./page";

const CatchTrainRoutes = () => {
  return (
    <Switch>
      <Route path="/:station/:direction/:departureTimeCode">
        <CatchPage />
      </Route>
      <Redirect path="/settings" />
    </Switch>
  );
};

export default CatchTrainRoutes;

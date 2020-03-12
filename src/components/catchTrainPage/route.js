import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CatchPage from "./page";
import { invalidConfiguration } from "./logic/selector";

const CatchTrainRoutes = () => {
  return (
    <Switch>
      <Route path="/:station/:direction/:departureTimeCode">
        <CatchPage />
      </Route>
      {invalidConfiguration() && <Redirect to="/settings" />}
      <Route path="/:station/:direction">
        <CatchPage />
      </Route>
      <Redirect to="/settings" />
    </Switch>
  );
};

export default CatchTrainRoutes;

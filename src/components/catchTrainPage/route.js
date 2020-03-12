import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CatchPage from "./page";

const CatchTrainRoutes = () => {
  return (
    <Switch>
      <Route path="/:station/:destination/:departureTime">
        <CatchPage />
      </Route>
      <Redirect path="/settings" />
    </Switch>
  );
};

export default CatchTrainRoutes;

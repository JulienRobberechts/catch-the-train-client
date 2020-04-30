import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CatchPageContainer from "./pageContainer";

const CatchTrainRoutes = () => {
  return (
    <Switch>
      <Route path="/next-train/:train">
        <CatchPageContainer />
      </Route>
      <Route path="/next-train">
        <CatchPageContainer />
      </Route>
      <Redirect to="/start" />
    </Switch>
  );
};

export default CatchTrainRoutes;

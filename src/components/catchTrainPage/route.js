import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CatchPageContainer from "./pageContainer";

const CatchTrainRoutes = () => {
  return (
    <Switch>
      <Route path="/:network/:line/:station/:train">
        <CatchPageContainer />
      </Route>
      <Route path="/:network/:line/:station">
        <CatchPageContainer />
      </Route>
      <Redirect to="/start" />
    </Switch>
  );
};

export default CatchTrainRoutes;

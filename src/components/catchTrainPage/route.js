import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CatchPageContainer from "./pageContainer";
import { selectConfigIsValid } from "../../domains/timeTable/selectors";
import { useSelector } from "react-redux";
const CatchTrainRoutes = () => {
  const configIsValid = useSelector(selectConfigIsValid);
  return (
    <Switch>
      <Route path="/:type/:line/:station/:train">
        <CatchPageContainer />
      </Route>
      {!configIsValid && <Redirect to="/settings" />}
      <Route path="/:type/:line/:station">
        <CatchPageContainer />
      </Route>
      <Redirect to="/start" />
    </Switch>
  );
};

export default CatchTrainRoutes;

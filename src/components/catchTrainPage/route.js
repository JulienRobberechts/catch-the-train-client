import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CatchPageContainer from "./pageContainer";
import { selectConfigIsValid } from "../../domains/timeTable/slice";
import { useSelector } from "react-redux";
const CatchTrainRoutes = () => {
  const configIsValid = useSelector(selectConfigIsValid);
  // console.log("configIsValid", configIsValid);
  return (
    <Switch>
      <Route path="/:station/:direction/:departureTimeCode">
        <CatchPageContainer />
      </Route>
      {!configIsValid && <Redirect to="/settings" />}
      <Route path="/:station/:direction">
        <CatchPageContainer />
      </Route>
      <Redirect to="/start" />
    </Switch>
  );
};

export default CatchTrainRoutes;

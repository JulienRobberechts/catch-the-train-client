import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CatchPage from "./page";
import { selectConfigIsValid } from "../../domains/timeTable/slice";
import { useSelector } from "react-redux";
const CatchTrainRoutes = () => {
  const configIsValid = useSelector(selectConfigIsValid);
  console.log("configIsValid", configIsValid);
  return (
    <Switch>
      <Route path="/:station/:direction/:departureTimeCode">
        <CatchPage />
      </Route>
      {!configIsValid && <Redirect to="/settings" />}
      <Route path="/:station/:direction">
        <CatchPage />
      </Route>
      <Redirect to="/settings" />
    </Switch>
  );
};

export default CatchTrainRoutes;

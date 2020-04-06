import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { requestStart } from "../../domains/timeTable/slice";
import {
  chooseTrain,
  setUserConfiguration,
  setStationConfiguration,
} from "../../domains/toTheStation/slice";
import { selectCurrentTrainCode } from "../../domains/toTheStation/selectors";
import { selectTimeTableContext } from "../../domains/timeTable/selectors";
import { selectDepartureByTrainCode } from "../../domains/timeTableToTheStation/selectors";

import CatchPage from "./page";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CatchPageContainer = () => {
  // Get data from the server at startup
  const dispatch = useDispatch();

  // Select the train according to the url
  const selectedRoute = useParams();
  console.log({ selectedRoute });

  let query = useQuery();
  const missions = query.get("missions");

  useEffect(() => {
    dispatch(requestStart({ ...selectedRoute, missions }));
  }, [dispatch, selectedRoute, missions]);

  useEffect(() => {
    dispatch(setUserConfiguration());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setStationConfiguration());
  }, [dispatch]);

  const trainDeparture = useSelector(
    selectDepartureByTrainCode(selectedRoute.train)
  );

  useEffect(() => {
    dispatch(chooseTrain(trainDeparture?.trainCode));
  }, [dispatch, trainDeparture, selectedRoute]);

  const currentTrainCode = useSelector(selectCurrentTrainCode);

  const context = useSelector(selectTimeTableContext);

  if (!currentTrainCode) return <div>...</div>;

  return <CatchPage station={context?.station?.name} />;
};

export default CatchPageContainer;

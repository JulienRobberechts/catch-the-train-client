import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetch } from "../../domains/timeTable/slice";
import { chooseTrain } from "../../domains/toTheStation/slice";
import { selectToTheStation } from "../../domains/toTheStation/selectors";
import {
  selectTrainDeparture,
  selectTimeTableContext,
} from "../../domains/timeTable/selectors";

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
  let query = useQuery();
  const missions = query.get("missions");

  console.log({ selectedRoute });

  useEffect(() => {
    dispatch(fetch({ ...selectedRoute, missions }));
  }, [dispatch, selectedRoute, missions]);

  const trainDeparture = useSelector(selectTrainDeparture(selectedRoute));
  useEffect(() => {
    dispatch(chooseTrain({ trainDeparture }));
  }, [dispatch, trainDeparture, selectedRoute]);

  const toTheStation = useSelector(selectToTheStation);

  const context = useSelector(selectTimeTableContext);

  if (!toTheStation.train) return <div>...</div>;

  return <CatchPage station={context?.station?.name} />;
};

export default CatchPageContainer;

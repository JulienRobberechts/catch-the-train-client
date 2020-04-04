import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetch } from "../../domains/timeTable/slice";
import { chooseTrain } from "../../domains/toTheStation/slice";
import { selectToTheStation } from "../../domains/toTheStation/selectors";
import { selectTrainDeparture } from "../../domains/timeTable/selectors";

import CatchPage from "./page";

const CatchPageContainer = () => {
  // Get data from the server at startup
  const dispatch = useDispatch();

  // Select the train according to the url
  const selectedRoute = useParams();

  useEffect(() => {
    dispatch(fetch(selectedRoute));
  }, [dispatch, selectedRoute]);

  const trainDeparture = useSelector(selectTrainDeparture(selectedRoute));
  useEffect(() => {
    dispatch(chooseTrain({ trainDeparture }));
  }, [dispatch, trainDeparture, selectedRoute]);

  const toTheStation = useSelector(selectToTheStation);

  if (toTheStation.noData) return <div>...</div>;
  return <CatchPage station={toTheStation?.station?.name} />;
};

export default CatchPageContainer;

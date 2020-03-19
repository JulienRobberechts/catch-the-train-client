import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { mockTimeTable } from "../../domains/timeTable/slice";
import { fetch } from "../../domains/timeTable/slice";
import { chooseTrain, updateTime } from "../../domains/toTheStation/slice";
import {
  selectToTheStation,
  selectNow
} from "../../domains/toTheStation/selectors";
import { selectTrainDeparture } from "../../domains/timeTable/selectors";

import CatchPage from "./page";

const CatchPageContainer = () => {
  // Get data from the server at startup
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  // Select the train according to the url
  const selectedRoute = useParams();
  const trainDeparture = useSelector(selectTrainDeparture(selectedRoute));
  useEffect(() => {
    dispatch(chooseTrain({ trainDeparture }));
  }, [dispatch, trainDeparture, selectedRoute]);

  // update the time every 10s
  const lastTime = useSelector(selectNow);
  const incrementMs = 1000;
  useEffect(() => {
    console.log("init setInterval");
    const interval = setInterval(() => {
      console.log("This will run every 2 second!");
      dispatch(updateTime({ lastTime, incrementMs }));
    }, incrementMs);
    return () => clearInterval(interval);
  }, [dispatch, lastTime]);

  const toTheStation = useSelector(selectToTheStation);

  if (toTheStation.noData) return <div>...</div>;
  return <CatchPage station={toTheStation?.station?.name} />;
};

export default CatchPageContainer;

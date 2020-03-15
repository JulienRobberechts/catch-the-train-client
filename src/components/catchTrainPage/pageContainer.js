import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { mockTimeTable } from "../../domains/timeTable/slice";
import {
  mockToTheStation,
  chooseTrain
} from "../../domains/toTheStation/slice";
import { selectToTheStation } from "../../domains/toTheStation/selectors";
import { selectTrainDeparture } from "../../domains/timeTable/selectors";

import CatchPage from "./page";

const CatchPageContainer = () => {
  const selectedRoute = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mockTimeTable());
    dispatch(mockToTheStation());
  }, [dispatch]);

  const trainDeparture = useSelector(selectTrainDeparture(selectedRoute));

  useEffect(() => {
    dispatch(
      chooseTrain({
        trainDeparture,
        stationCode: selectedRoute.station,
        direction: selectedRoute.direction,
        trainCode: selectedRoute.trainCode
      })
    );
  }, [dispatch, trainDeparture, selectedRoute]);

  const toTheStation = useSelector(selectToTheStation);
  // console.log("toTheStation", toTheStation);

  if (toTheStation.noData) return <div>...</div>;
  return <CatchPage station={toTheStation?.station.name} />;
};

export default CatchPageContainer;

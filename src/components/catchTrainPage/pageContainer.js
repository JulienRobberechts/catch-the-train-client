import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { mockTimeTable } from "../../domains/timeTable/slice";
import {
  mockToTheStation,
  chooseTrain
} from "../../domains/toTheStation/slice";
import { selectToTheStation } from "../../domains/toTheStation/selectors";

import CatchPage from "./page";

const CatchPageContainer = () => {
  const selectedRoute = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mockTimeTable());
    dispatch(mockToTheStation());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      chooseTrain({
        stationCode: selectedRoute.station,
        direction: selectedRoute.direction,
        trainCode: selectedRoute.trainCode
      })
    );
  }, [dispatch, selectedRoute]);

  const toTheStation = useSelector(selectToTheStation);
  // console.log("toTheStation", toTheStation);

  if (toTheStation.noData) return <div>...</div>;
  return <CatchPage station={toTheStation?.station.name} />;
};

export default CatchPageContainer;

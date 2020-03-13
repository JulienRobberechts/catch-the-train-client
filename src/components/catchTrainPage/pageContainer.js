import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { mock as mockToTheStation } from "../../domains/toTheStation/slice";
import {
  selectStationCode,
  mock as mockTimeTable
} from "../../domains/timeTable/slice";

import CatchPage from "./page";

const CatchPageContainer = () => {
  const { station, direction, departureTimeCode } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mockToTheStation());
    dispatch(mockTimeTable());
  }, [dispatch]);

  const stationAvailable = useSelector(selectStationCode);

  return <CatchPage station={station} />;
};

export default CatchPageContainer;

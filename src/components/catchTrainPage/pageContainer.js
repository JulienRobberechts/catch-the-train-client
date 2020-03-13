import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { mockTimeTable } from "../../domains/timeTable/slice";
import {
  selectToTheStation,
  mockToTheStation,
  chooseTrain
} from "../../domains/toTheStation/slice";

import CatchPage from "./page";

const CatchPageContainer = () => {
  const urlParameters = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mockTimeTable());
    dispatch(mockToTheStation());
    dispatch(chooseTrain(urlParameters));
  }, [dispatch, urlParameters]);

  const toTheStation = useSelector(selectToTheStation);
  console.log("toTheStation", toTheStation);

  if (toTheStation.noData) return <div>...</div>;
  return <CatchPage station={toTheStation?.station.name} />;
};

export default CatchPageContainer;

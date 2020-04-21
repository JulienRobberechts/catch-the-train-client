import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { requestStart } from "../../domains/timeTable/slice";
import {
  chooseTrain,
  setUserConfiguration,
} from "../../domains/toTheStation/slice";
import { getStationBySlug } from "../../domains/journey/service";
import { selectCurrentJourney } from "../../domains/journey/selectors";
import { selectDepartureByTrainCode } from "../../domains/timeTable/selectors";
import CatchPage from "./page";

const CatchPageContainer = () => {
  const dispatch = useDispatch();
  const journey = useSelector(selectCurrentJourney);
  const { train } = useParams();

  useEffect(() => {
    if (journey) {
      dispatch(requestStart(journey));
    }
  }, [dispatch, journey]);

  useEffect(() => {
    dispatch(
      setUserConfiguration({
        onTimeMarginDelaySeconds: 50,
        timezone: "+01:00",
      })
    );
  }, [dispatch]);

  const trainDeparture = useSelector(selectDepartureByTrainCode(train));

  useEffect(() => {
    dispatch(chooseTrain(trainDeparture?.trainCode));
  }, [dispatch, trainDeparture]);

  const stationName = getStationBySlug(journey?.station)?.name;

  return <CatchPage station={stationName} />;
};

export default CatchPageContainer;

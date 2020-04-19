import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestStart } from "../../domains/timeTable/slice";
import {
  chooseTrain,
  setUserConfiguration,
} from "../../domains/toTheStation/slice";
import { getStationBySlug } from "../../domains/journey/service";
// import { getMissions } from "../../domains/journey/service";
import {
  selectTimeTableRequest,
  selectDepartureByTrainCode,
} from "../../domains/timeTable/selectors";
// import { selectCurrentTrainCode } from "../../domains/toTheStation/selectors";

import CatchPage from "./page";

// A custom hook that builds on useLocation to parse
// the query string for you.
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const CatchPageContainer = () => {
  // Get data from the server at startup
  const dispatch = useDispatch();

  const request = useSelector(selectTimeTableRequest);

  // Select the train according to the url
  const { train } = useParams();
  // let query = useQuery();
  // const missions = query.get("missions");
  // console.log("current url", { network, line, station, train, missions });

  // const missions = getMissions(request.departure, request.destination);

  useEffect(() => {
    console.log("dispatch requestStart");
    if (request) {
      dispatch(requestStart(request));
    }
  }, [dispatch, request]);

  useEffect(() => {
    console.log("dispatch setUserConfiguration");
    dispatch(
      setUserConfiguration({
        onTimeMarginDelaySeconds: 50,
        timezone: "+01:00",
      })
    );
  }, [dispatch]);

  const trainDeparture = useSelector(selectDepartureByTrainCode(train));

  useEffect(() => {
    console.log("dispatch setUserConfiguration");
    dispatch(chooseTrain(trainDeparture?.trainCode));
  }, [dispatch, trainDeparture]);

  const stationName = getStationBySlug(request?.station)?.name;

  // console.log("render page CatchPageContainer");
  return <CatchPage station={stationName} />;
};

export default CatchPageContainer;

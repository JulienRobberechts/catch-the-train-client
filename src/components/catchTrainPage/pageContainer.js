import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { requestStart } from "../../domains/timeTable/slice";
import {
  chooseTrain,
  setUserConfiguration,
  setStationConfiguration,
} from "../../domains/toTheStation/slice";

import {
  selectTimeTableContext,
  selectDepartureByTrainCode,
} from "../../domains/timeTable/selectors";
import { selectCurrentTrainCode } from "../../domains/toTheStation/selectors";

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
  const { network, line, station, train } = useParams();
  let query = useQuery();
  const missions = query.get("missions");
  // console.log("current url", { network, line, station, train, missions });

  useEffect(() => {
    dispatch(requestStart({ network, line, station, missions }));
  }, [dispatch, network, line, station, missions]);

  useEffect(() => {
    dispatch(
      setUserConfiguration({
        onTimeMarginDelaySeconds: 50,
        timezone: "+01:00",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setStationConfiguration({
        station: "chatelet+les+halles",
        travelDurationSeconds: 10 * 60 + 25,
        waitingDelaySeconds: 100,
      })
    );
  }, [dispatch]);

  const trainDeparture = useSelector(selectDepartureByTrainCode(train));

  useEffect(() => {
    dispatch(chooseTrain(trainDeparture?.trainCode));
  }, [dispatch, trainDeparture]);

  // const currentTrainCode = useSelector(selectCurrentTrainCode);

  const context = useSelector(selectTimeTableContext);

  // if (!currentTrainCode) return <div>...</div>;

  // console.log("render page CatchPageContainer");
  return <CatchPage station={context?.station?.name} />;
};

export default CatchPageContainer;

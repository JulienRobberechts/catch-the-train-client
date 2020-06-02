import React, { useMemo, Dispatch, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MapPosition } from "../../domains/map/geoTypes";

import { setStationConfiguration } from "../../domains/station/slice";
import { selectCurrentStationConfiguration } from "../../domains/timeTableToTheStation/selectors";
import { getStationBySlug } from "../../domains/journey/service";
import { selectCurrentJourney } from "../../domains/journey/selectors";
import ResizeContainer from "./ResizeContainer";

const saveAndNavigate = (
  station: string,
  dispatch: Dispatch<any>,
  pushMethod: (path: string) => void,
  travelDurationSeconds: number
) => {
  dispatch(
    setStationConfiguration({
      station,
      travelDurationSeconds: travelDurationSeconds,
    })
  );

  pushMethod("/preferences");
};

const getStationPosition = (stationSlug: string | undefined): MapPosition => {
  switch (stationSlug) {
    case "st+germain+en+laye":
      return [2.094677, 48.898316];
    case "auber":
      return [2.3297068164482293, 48.87260817994105];
    default:
      return [2.094677, 48.898316];
  }
};

const SelectDurationPage = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const stationConfiguration = useSelector(selectCurrentStationConfiguration);
  const initialTravelDurationSeconds =
    stationConfiguration?.travelDurationSeconds || 600;

  const currentJourney = useSelector(selectCurrentJourney);
  const stationSlug = currentJourney?.departure;
  const stationName = getStationBySlug(currentJourney?.departure)?.name;

  const stationPosition = useMemo(() => getStationPosition(stationSlug), [
    stationSlug,
  ]);

  const onValidate = useCallback(
    (duration) => {
      if (stationSlug) {
        console.log("saveAndNavigate", duration);
        saveAndNavigate(stationSlug, dispatch, push, duration);
      }
    },
    [dispatch, push, stationSlug]
  );

  return (
    <>
      <Helmet>
        <title>Trajet</title>
      </Helmet>
      <ResizeContainer
        stationName={stationName}
        initialDuration={initialTravelDurationSeconds}
        initialStationPosition={stationPosition}
        onValidate={onValidate}
      />
    </>
  );
};

export default SelectDurationPage;

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

  pushMethod("/select-access-duration");
};

const getStationPosition = (
  stationSlug: string | undefined
): MapPosition | null => {
  const station = getStationBySlug(stationSlug);
  if (!station) return null;
  return station.pos ?? null;
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
      {stationPosition ? (
        <ResizeContainer
          stationName={stationName}
          initialDuration={initialTravelDurationSeconds}
          initialStationPosition={stationPosition}
          onValidate={onValidate}
        />
      ) : (
        <div>La position de la gare n'est pas disponible</div>
      )}
    </>
  );
};

export default SelectDurationPage;

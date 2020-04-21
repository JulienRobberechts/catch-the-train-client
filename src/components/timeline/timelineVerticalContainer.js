import React from "react";
import { useSelector } from "react-redux";

import { selectEnhancedTimeTable } from "../../domains/timeTableToTheStation/selectors";
import { selectRequestStatus } from "../../domains/timeTable/selectors";
import { selectTimeTableRequest } from "../../domains/journey/selectors";
import { getStationBySlug } from "../../domains/journey/service";
import LoadingPanel from "./loadingPanel";
import ErrorPanel from "./errorPanel";
import TimelineVertical from "./timelineVertical";

const TimelineVerticalContainer = () => {
  const data = useSelector(selectEnhancedTimeTable);
  const requestStatus = useSelector(selectRequestStatus);
  const currentJourney = useSelector(selectTimeTableRequest);

  if (!data || !data.travel) {
    return <div>... no travel data </div>;
  }

  const {
    travel: { nowTime, travelDuration, accessDuration },
  } = data;

  const departureName = getStationBySlug(currentJourney?.departure)?.name;

  // currentDeparture can be null for 2 reasons:
  // - stationConfiguration empty
  // - userConfiguration empty
  // TODO: expose this

  if (!data?.currentDeparture?.code || !data?.enhancedDepartures) {
    return (
      <div>
        {requestStatus?.loading && (
          <LoadingPanel departureName={departureName} />
        )}
        {!requestStatus?.loading && requestStatus?.error && (
          <ErrorPanel error={requestStatus?.error} />
        )}
      </div>
    );
  }

  const {
    currentDeparture: { index: departureIndex } = { index: undefined },
    enhancedDepartures,
  } = data;

  const departure = enhancedDepartures[departureIndex];
  if (!departure) {
    throw Error("Departure is empty. It should never happen");
  }

  const {
    departureTime,
    departureDuration,
    delayDuration,
    delayStatus,
  } = departure;

  return (
    <TimelineVertical
      nowTime={nowTime}
      departureTime={departureTime}
      departureDuration={departureDuration}
      delayDuration={delayDuration}
      delayStatus={delayStatus}
      travelDuration={travelDuration}
      accessDuration={accessDuration}
    />
  );
};

export default TimelineVerticalContainer;

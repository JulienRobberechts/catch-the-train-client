import React from "react";
import { useSelector } from "react-redux";
import { selectEnhancedTimeTable } from "../../domains/timeTableToTheStation/selectors";
import {
  selectRequestStatus,
  selectTimeTableRequest,
} from "../../domains/timeTable/selectors";
import ErrorPanel from "./errorPanel";
import LoadingPanel from "./loadingPanel";
import { getStationBySlug } from "../../domains/journey/service";
import TimelineVertical from "./timelineVertical";

const TimelineVerticalContainer = () => {
  const data = useSelector(selectEnhancedTimeTable);
  const requestStatus = useSelector(selectRequestStatus);
  const request = useSelector(selectTimeTableRequest);

  if (!data || !data.travel) {
    return <div>... no travel data </div>;
  }

  const {
    travel: { nowTime, travelDuration, waitingDuration },
  } = data;

  const departureName = getStationBySlug(request?.station)?.name;

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

  console.log("departure", { departure });

  return (
    <TimelineVertical
      nowTime={nowTime}
      departureTime={departureTime}
      departureDuration={departureDuration}
      delayDuration={delayDuration}
      delayStatus={delayStatus}
      travelDuration={travelDuration}
      waitingDuration={waitingDuration}
    />
  );
};

export default TimelineVerticalContainer;

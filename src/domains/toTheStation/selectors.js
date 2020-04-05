import moment from "moment";
import { getDelay, getDelayStatus } from "./pure";

// to move
import { selectAllDepartures } from "../timeTable/selectors";

export const selectNow = (state) => state?.toTheStation?.currentTime;

// To split into smaller piece
export const selectToTheStation = (state) => state?.toTheStation;

// TO MOVE ??
export const selectEnhancedToTheStation = (state) => {
  // const { timeTable } = state; // MASHUP !!!!!!

  const toTheStation = selectToTheStation(state);
  const departures = selectAllDepartures(state);

  if (!departures || !toTheStation) return null;

  const trainCode = toTheStation?.train?.trainCode;

  if (!trainCode) {
    return null;
  }

  const departureIndex = Math.max(
    departures.findIndex((departure) => departure.trainCode === trainCode),
    0
  );

  const departure = departures[departureIndex];

  const {
    userConfiguration: { onTimeMarginDelaySeconds },
    stationConfiguration: { travelDurationSeconds, waitingDelaySeconds },
  } = toTheStation;

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds,
  });
  const targetTime = moment.parseZone(departure.departureTime);

  const nowTime = toTheStation.currentTime
    ? moment.parseZone(toTheStation.currentTime)
    : null;

  const { targetDuration, delayDuration } = getDelay({
    nowTime,
    targetTime,
    travelDuration,
    waitingDuration,
  });
  const delayStatus = getDelayStatus(delayDuration, onTimeMarginDelaySeconds);

  return {
    route: departure.route,
    nowTime,
    targetDuration,
    targetTime,
    travelDuration,
    waitingDuration,
    delayDuration,
    delayStatus,
  };
};

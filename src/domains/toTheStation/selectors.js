import moment from "moment";
import { getDelay, getDelayStatus } from "./pure";

export const selectNow = state => state?.toTheStation?.currentTime;

export const selectToTheStation = state => state?.toTheStation;

// TO MOVE ??
export const selectEnhancedToTheStation = state => {
  const { timeTable, toTheStation } = state; // MASHUP !!!!!!

  if (!state.timeTable.route || state.toTheStation.noData) return null;

  const { trains } = timeTable.route;

  if (!trains) {
    return null;
  }

  const trainCode = state?.toTheStation?.train?.trainCode;

  if (!trainCode) {
    return null;
  }

  const departureIndex = Math.max(
    trains.findIndex(departure => departure.trainCode === trainCode),
    0
  );

  const departure = trains[departureIndex];

  // second part
  // From the slice toTheStation

  const {
    userConfiguration: { onTimeMarginDelaySeconds },
    stationConfiguration: { travelDurationSeconds, waitingDelaySeconds }
  } = toTheStation;

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds
  });
  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds
  });
  const targetTime = moment.parseZone(departure.departureTime);

  const nowTime = state.toTheStation.currentTime
    ? moment.parseZone(state.toTheStation.currentTime)
    : null;

  const { targetDuration, delayDuration } = getDelay({
    nowTime,
    targetTime,
    travelDuration,
    waitingDuration
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
    delayStatus
  };
};

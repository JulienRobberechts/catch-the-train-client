import moment from "moment";
import { getDelay, getDelayStatus } from "./pure";

// to move
import { selectAllDepartures } from "../timeTable/selectors";

export const selectNow = (state) => state?.toTheStation?.currentTime;

export const selectUserConfiguration = (state) =>
  state?.toTheStation?.userConfiguration;

export const selectStationConfiguration = (state) =>
  state?.toTheStation?.stationConfiguration;

export const selectCurrentTrainCode = (state) =>
  state?.toTheStation?.currentTrainCode;

// TO MOVE ??
export const selectEnhancedToTheStation = (state) => {
  // const { timeTable } = state; // MASHUP !!!!!!

  const currentTime = selectNow(state);
  const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectStationConfiguration(state);
  const departures = selectAllDepartures(state);

  if (!departures || !currentTrainCode) return null;

  const departureIndex = Math.max(
    departures.findIndex(
      (departure) => departure.trainCode === currentTrainCode
    ),
    0
  );

  const departure = departures[departureIndex];

  const { onTimeMarginDelaySeconds } = userConfiguration;
  const { travelDurationSeconds, waitingDelaySeconds } = stationConfiguration;

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds,
  });
  const targetTime = moment.parseZone(departure.departureTime);

  const nowTime = currentTime ? moment.parseZone(currentTime) : null;

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

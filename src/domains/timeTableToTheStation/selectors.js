import moment from "moment";
import { getDelay, getDelayStatus } from "../toTheStation/pure";

import { selectAllDepartures } from "../timeTable/selectors";

import {
  selectNow,
  selectUserConfiguration,
  selectStationConfiguration,
  selectCurrentTrainCode,
} from "../toTheStation/selectors";

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.

export const selectEnhancedTimeTable = (state) => {
  const currentTime = selectNow(state);
  const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectStationConfiguration(state);
  const rawDepartures = selectAllDepartures(state);
  return enhancedTimeTable({
    currentTime,
    currentTrainCode,
    userConfiguration,
    stationConfiguration,
    rawDepartures,
  });
};

export const enhancedTimeTable = ({
  currentTime,
  currentTrainCode,
  userConfiguration,
  stationConfiguration,
  rawDepartures,
}) => {
  if (
    !currentTime ||
    !rawDepartures ||
    !stationConfiguration ||
    !userConfiguration
  )
    return null;

  const nowTime = moment.parseZone(currentTime);

  const enhancedDepartures = rawDepartures.map((departure, index) =>
    enhancedDeparture(
      departure,
      index,
      nowTime,
      stationConfiguration,
      userConfiguration
    )
  );

  return enhancedDepartures;
};

export const enhancedDeparture = (
  departure,
  index,
  nowTime,
  stationConfiguration,
  userConfiguration
) => {
  const departureTime = moment.parseZone(departure.departureTime);
  const departureDuration = moment.duration(departureTime.diff(nowTime));
  const targetTime = moment.parseZone(departure.departureTime);
  const travelDuration = moment.duration({
    seconds: stationConfiguration.travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: stationConfiguration.waitingDelaySeconds,
  });

  const trainCode = departure.trainCode;

  const { targetDuration, delayDuration } = getDelay({
    nowTime,
    targetTime,
    travelDuration,
    waitingDuration,
  });
  const delayStatus = getDelayStatus(
    delayDuration,
    userConfiguration.onTimeMarginDelaySeconds
  );

  return {
    index,
    departureTime,
    departureDuration,
    targetDuration,
    delayDuration,
    delayStatus,
    trainCode,
  };
};

export const selectDepartureByTrainCode = (trainCode) => (state) => {
  // console.log("selectDepartureByTrainCode");

  // search in trains
  const rawDepartures = selectAllDepartures(state);

  if (!rawDepartures) {
    return null;
  }

  // TODO ...

  const departureIndex = Math.max(
    rawDepartures.findIndex((departure) => departure.trainCode === trainCode),
    0
  );
  // if found:
  // if not found: return closest to the time
  // return `MY TRAIN DEPARTURE trainCode=${trainCode} currentIndex=${currentIndex}`;
  return rawDepartures[departureIndex];
};

export const selectEnhancedToTheStation = (state) => {
  const currentTime = selectNow(state);
  const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectStationConfiguration(state);
  const rawDepartures = selectAllDepartures(state);

  return calculateEnhancedToTheStation({
    currentTime,
    currentTrainCode,
    userConfiguration,
    stationConfiguration,
    rawDepartures,
  });
};

export const calculateEnhancedToTheStation = ({
  currentTime,
  currentTrainCode,
  userConfiguration,
  stationConfiguration,
  rawDepartures,
}) => {
  if (
    !currentTime ||
    !currentTrainCode ||
    !rawDepartures ||
    !stationConfiguration ||
    !userConfiguration
  )
    return null;

  const departureIndex = Math.max(
    rawDepartures.findIndex(
      (departure) => departure.trainCode === currentTrainCode
    ),
    0
  );

  const departure = rawDepartures[departureIndex];

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

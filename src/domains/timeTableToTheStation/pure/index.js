import moment from "moment";
import { getDelay, getDelayStatus } from "../../toTheStation/pure";

export const getMatchingDeparture = (allDepartures, trainCode) => {
  if (!allDepartures) {
    return null;
  }
  const departureIndex = Math.max(
    allDepartures.findIndex((departure) => departure.trainCode === trainCode),
    0
  );
  // if found:
  // if not found: return closest to the time
  return allDepartures[departureIndex];
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

  const travelDuration = moment.duration({
    seconds: stationConfiguration.travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: stationConfiguration.waitingDelaySeconds,
  });
  const { onTimeMarginDelaySeconds } = userConfiguration;

  const enhancedDepartures = rawDepartures.map((departure, index) =>
    enhancedDeparture(
      departure,
      index,
      nowTime,
      onTimeMarginDelaySeconds,
      travelDuration,
      waitingDuration
    )
  );

  return {
    travel: {
      nowTime,
      travelDuration,
      waitingDuration,
    },
    enhancedDepartures,
  };
};

export const enhancedDeparture = (
  departure,
  index,
  nowTime,
  onTimeMarginDelaySeconds,
  travelDuration,
  waitingDuration
) => {
  const departureTime = moment.parseZone(departure.departureTime);

  const trainCode = departure.trainCode;

  const { departureDuration, delayDuration } = getDelay({
    nowTime,
    departureTime,
    travelDuration,
    waitingDuration,
  });

  const delayStatus = getDelayStatus(delayDuration, onTimeMarginDelaySeconds);

  return {
    index,
    trainCode,
    departureTime,
    departureDuration,
    delayDuration,
    delayStatus,
  };
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
  const departureTime = moment.parseZone(departure.departureTime);

  const nowTime = currentTime ? moment.parseZone(currentTime) : null;

  const { departureDuration, delayDuration } = getDelay({
    nowTime,
    departureTime,
    travelDuration,
    waitingDuration,
  });
  const delayStatus = getDelayStatus(delayDuration, onTimeMarginDelaySeconds);

  return {
    nowTime,
    travelDuration,
    waitingDuration,

    departureTime,
    departureDuration,
    delayDuration,
    delayStatus,
  };
};

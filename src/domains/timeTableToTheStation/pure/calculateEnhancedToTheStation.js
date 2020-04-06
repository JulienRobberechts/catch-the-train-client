import moment from "moment";
import { getDelay, getDelayStatus } from "../../toTheStation/pure";

export default function calculateEnhancedToTheStation({
  currentTime,
  currentTrainCode,
  userConfiguration,
  stationConfiguration,
  rawDepartures,
}) {
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
}

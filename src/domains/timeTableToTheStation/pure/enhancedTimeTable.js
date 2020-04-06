import moment from "moment";
import { getDelay, getDelayStatus } from "../../toTheStation/pure";

export default function enhancedTimeTable({
  currentTime,
  currentTrainCode,
  userConfiguration,
  stationConfiguration,
  rawDepartures,
}) {
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
}

export function enhancedDeparture(
  departure,
  index,
  nowTime,
  onTimeMarginDelaySeconds,
  travelDuration,
  waitingDuration
) {
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
}

import moment from "moment";
import { enhanceDeparture } from "./enhancedTimeTable";

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

  const nowTime = currentTime ? moment.parseZone(currentTime) : null;

  const { onTimeMarginDelaySeconds } = userConfiguration;

  const { travelDurationSeconds, waitingDelaySeconds } = stationConfiguration;

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds,
  });

  const enhancedDepartureInstance = enhanceDeparture(
    departure,
    departureIndex,
    nowTime,
    onTimeMarginDelaySeconds,
    travelDuration,
    waitingDuration
  );

  return {
    travel: {
      nowTime,
      travelDuration,
      waitingDuration,
    },
    enhancedDeparture: enhancedDepartureInstance,
  };
}

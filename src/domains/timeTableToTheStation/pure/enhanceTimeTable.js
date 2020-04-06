import moment from "moment";
import { enhanceDeparture } from "./enhanceDeparture";

export default function enhanceTimeTable({
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

  const departureIndex = Math.max(
    rawDepartures.findIndex(
      (departure) => departure.trainCode === currentTrainCode
    ),
    0
  );

  const nowTime = moment.parseZone(currentTime);
  const travelDuration = moment.duration({
    seconds: stationConfiguration.travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: stationConfiguration.waitingDelaySeconds,
  });
  const { onTimeMarginDelaySeconds } = userConfiguration;

  const enhancedDepartures = rawDepartures.map((departure, departureIndex) =>
    enhanceDeparture(
      departure,
      departureIndex,
      nowTime,
      onTimeMarginDelaySeconds,
      travelDuration,
      waitingDuration
    )
  );

  return {
    currentDeparture: {
      index: departureIndex,
      code: currentTrainCode,
    },
    travel: {
      nowTime,
      travelDuration,
      waitingDuration,
    },
    enhancedDepartures,
  };
}

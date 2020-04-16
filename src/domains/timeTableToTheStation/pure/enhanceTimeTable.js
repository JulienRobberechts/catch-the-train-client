import moment from "moment";
import { enhanceDeparture } from "./enhanceDeparture";

export default function enhanceTimeTable({
  currentTime,
  currentTrainCode,
  userConfiguration,
  stationConfiguration,
  rawDepartures,
}) {
  // currentDeparture can be null for 2 reasons:
  // - stationConfiguration empty
  // - userConfiguration empty
  // TODO: expose this

  if (!stationConfiguration) return { currentDeparture: null };

  const travelDuration = moment.duration({
    seconds: stationConfiguration.travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: stationConfiguration.waitingDelaySeconds,
  });

  if (!currentTime) return { currentDeparture: null };
  const nowTime = moment.parseZone(currentTime);

  if (!rawDepartures)
    throw Error("rawDepartures is empty. It should never happen");

  if (!userConfiguration)
    return {
      currentDeparture: null,
      travel: {
        nowTime,
        travelDuration,
        waitingDuration,
      },
    };

  const departureIndex = Math.max(
    rawDepartures.findIndex(
      (departure) => departure.trainCode === currentTrainCode
    ),
    0
  );

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

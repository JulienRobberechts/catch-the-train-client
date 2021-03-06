import moment from "moment";
import { enhanceDeparture } from "./enhanceDeparture";
import { StationConfiguration, UserConfiguration } from "../../station/types";
import { RawDeparture } from "../../timeTable/types";
import { EnhanceTimeTable, EnhancedDeparture } from "../types";

interface enhanceTimeTableParams {
  currentTime: string;
  currentTrainCode: string;
  userConfiguration?: UserConfiguration;
  stationConfiguration?: StationConfiguration;
  rawDepartures: RawDeparture[];
}

export default function enhanceTimeTable({
  currentTime,
  currentTrainCode,
  userConfiguration,
  stationConfiguration,
  rawDepartures,
}: enhanceTimeTableParams): EnhanceTimeTable {
  // currentDeparture can be null for 2 reasons:
  // - stationConfiguration empty
  // - userConfiguration empty
  // TODO: expose this

  if (!stationConfiguration) return { };

  const travelDuration = moment.duration({
    seconds: stationConfiguration.travelDurationSeconds,
  });
  const accessDuration = moment.duration({
    seconds: stationConfiguration.accessDurationSeconds,
  });

  if (!currentTime) return { };
  const nowTime = moment.parseZone(currentTime);

  if (!rawDepartures)
    throw Error("rawDepartures is empty. It should never happen");

  if (!userConfiguration)
    return {
      travel: {
        nowTime,
        travelDuration,
        accessDuration,
      },
    };

  const departureIndex = Math.max(
    rawDepartures.findIndex(
      (departure) => departure.trainCode === currentTrainCode
    ),
    0
  );

  const { onTimeMarginDelaySeconds } = userConfiguration;

  const enhancedDepartures:EnhancedDeparture[] = rawDepartures.map((departure, departureIndex) =>
    enhanceDeparture(
      departure,
      departureIndex,
      nowTime,
      onTimeMarginDelaySeconds,
      travelDuration,
      accessDuration
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
      accessDuration,
    },
    enhancedDepartures,
  };
}

import moment from "moment";
import { getDelay, getDelayStatus } from "../../toTheStation/pure";
import { RawDeparture } from "../../timeTable/types";
import { EnhancedDeparture } from "../types";

export function enhanceDeparture(
  departure: RawDeparture,
  departureIndex: number,
  nowTime: moment.Moment,
  onTimeMarginDelaySeconds: number,
  travelDuration: moment.Duration,
  accessDuration: moment.Duration
): EnhancedDeparture {
  const departureTime = moment.parseZone(departure.departureTime);

  const trainCode = departure.trainCode;

  const { departureDuration, delayDuration } = getDelay({
    nowTime,
    departureTime,
    travelDuration,
    accessDuration,
  });

  const delayStatus = getDelayStatus(
    departureDuration,
    travelDuration,
    accessDuration
  );

  return {
    departureIndex,
    trainCode,
    departure,

    departureTime,
    departureDuration,

    delayDuration,
    delayStatus,
    onTimeMarginDelaySeconds,
  };
}

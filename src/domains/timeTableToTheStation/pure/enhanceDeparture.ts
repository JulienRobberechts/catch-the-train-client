import moment from "moment";
import { getDelay, getDelayStatus } from "../../toTheStation/pure";
import { RawDeparture } from "../../timeTable/types";

export function enhanceDeparture(
  departure: RawDeparture,
  index: number,
  nowTime: moment.Moment,
  onTimeMarginDelaySeconds: number,
  travelDuration: moment.Duration,
  accessDuration: moment.Duration
) {
  const departureTime = moment.parseZone(departure.departureTime);

  const trainCode = departure.trainCode;

  const { departureDuration, delayDuration } = getDelay({
    nowTime,
    departureTime,
    travelDuration,
    accessDuration,
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

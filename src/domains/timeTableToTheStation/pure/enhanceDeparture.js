import moment from "moment";
import { getDelay, getDelayStatus } from "../../toTheStation/pure";

export function enhanceDeparture(
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

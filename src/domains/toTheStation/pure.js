import moment from "moment";
import { getDelayStatus } from "../train/pure";

export const calculateTravelData = ({
  nowTime,
  departure,
  travelDurationSeconds,
  waitingDelaySeconds,
  onTimeMarginDelaySeconds
}) => {
  const targetTime = moment.parseZone(departure.departureTime);

  const targetDuration = moment.duration(targetTime.diff(nowTime));

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds
  });

  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds
  });

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  const delayStatus = getDelayStatus(delayDuration, onTimeMarginDelaySeconds);

  return {
    route: departure.route,
    nowTime,
    targetDuration,
    targetTime,
    travelDuration,
    waitingDuration,
    delayDuration,
    delayStatus
  };
};

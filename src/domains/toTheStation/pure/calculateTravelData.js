import moment from "moment";
import getDelayStatus from "./getDelayStatus";

export default function calculateTravelData({
  nowTime,
  targetTime,
  travelDuration,
  waitingDuration,
  onTimeMarginDelaySeconds
}) {
  const targetDuration = moment.duration(targetTime.diff(nowTime));

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  const delayStatus = getDelayStatus(delayDuration, onTimeMarginDelaySeconds);

  return {
    targetDuration,
    delayDuration,
    delayStatus
  };
}

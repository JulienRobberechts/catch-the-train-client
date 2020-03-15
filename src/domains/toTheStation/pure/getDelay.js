import moment from "moment";
import getDelayStatus from "./getDelayStatus";

export default function getDelay({
  nowTime,
  targetTime,
  travelDuration,
  waitingDuration
}) {
  const targetDuration = moment.duration(targetTime.diff(nowTime));

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  return {
    targetDuration,
    delayDuration
  };
}

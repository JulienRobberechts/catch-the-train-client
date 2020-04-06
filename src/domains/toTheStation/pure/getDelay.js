import moment from "moment";

export default function getDelay({
  nowTime,
  targetTime,
  travelDuration,
  waitingDuration,
}) {
  const departureDuration = moment.duration(targetTime.diff(nowTime));

  // positive will be early and negative late
  const delayDuration = departureDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  return {
    departureDuration,
    delayDuration,
  };
}

import moment from "moment";

export default function getDelay({
  nowTime,
  departureTime,
  travelDuration,
  accessDuration,
}) {
  const departureDuration = moment.duration(departureTime.diff(nowTime));

  // positive will be early and negative late
  const delayDuration = departureDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(accessDuration);

  return {
    departureDuration,
    delayDuration,
  };
}

import moment from "moment";

interface GetDelayParams {
  nowTime: moment.Moment;
  departureTime: moment.Moment;
  travelDuration: moment.Duration;
  accessDuration: moment.Duration;
}

export default function getDelay({
  nowTime,
  departureTime,
  travelDuration,
  accessDuration,
}: GetDelayParams) {
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

import moment from "moment";

export const convertToTrainCode = timeString => {
  const momentTime = new moment.utc(new Date(timeString));
  return timeToLocal(momentTime).format("kkmm");
};

export const timeToLocal = timeMoment => {
  return timeMoment.clone().local();
};

export const getDelayStatus = (delayDuration, onTimeMarginDelaySeconds) => {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return "early";
  if (delayDurationSeconds < -onTimeMarginDelaySeconds) return "late";
  return "ontime";
};
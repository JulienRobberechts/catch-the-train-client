import moment from "moment";

export const convertToTrainCode = timeString => {
  const momentTime = moment.parseZone(timeString);
  return momentTime.format("kkmm");
};

export const getDelayStatus = (delayDuration, onTimeMarginDelaySeconds) => {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (isNaN(delayDurationSeconds)) return "invalid";
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return "early";
  if (delayDurationSeconds < -onTimeMarginDelaySeconds) return "late";
  return "ontime";
};

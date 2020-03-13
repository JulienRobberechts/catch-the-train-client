import moment from "moment";

export const convertToTrainCode = timeString => {
  const momentTime = new moment.utc(new Date(timeString));
  return momentTime.isValid ? momentTime.format("hhmm") : null;
};

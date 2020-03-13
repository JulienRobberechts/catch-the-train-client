import moment from "moment";

export const convertToTrainCode = timeString => {
  const momentTime = new moment.utc(new Date(timeString));
  return timeToLocal(momentTime).format("kkmm");
};

export const timeToLocal = timeMoment => {
  return timeMoment.clone().local();
};

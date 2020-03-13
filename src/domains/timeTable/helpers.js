import moment from "moment";

export const timeCode = time => {
  const momentTime = new moment.utc(new Date(time.departureTime));
  console.log("timeCode", momentTime);
  return momentTime.format("hhmm");
};

import moment from "moment";

export const timeCode = time => {
  console.log("timeCode TIME ", time);
  const momentTime = new moment.utc(new Date(time));
  console.log("timeCode", momentTime);
  return momentTime.format("hhmm");
};

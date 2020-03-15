import moment from "moment";

export default function convertToTrainCode(timeString) {
  const momentTime = moment.parseZone(timeString);
  return momentTime.format("kkmm");
}

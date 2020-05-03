import moment from "moment";

export function twoDigits(number : number) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

export function getHours(timeMoment: moment.Moment) {
  const hours = timeMoment.hours();
  return hours.toString();
}

export function getMinutes(timeMoment: moment.Moment) {
  const minutes = timeMoment.minutes();
  const minutesStr = twoDigits(minutes);
  return minutesStr;
}

export function getSeconds(timeMoment: moment.Moment) {
  const seconds = timeMoment.seconds();
  const secondsStr = twoDigits(seconds);
  return secondsStr;
}

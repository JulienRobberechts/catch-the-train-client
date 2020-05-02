export function twoDigits(number) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

export function getHours(timeMoment) {
  const hours = timeMoment.hours();
  return hours.toString();
}

export function getMinutes(timeMoment) {
  const minutes = timeMoment.minutes();
  const minutesStr = twoDigits(minutes);
  return minutesStr;
}

export function getSeconds(timeMoment) {
  const seconds = timeMoment.seconds();
  const secondsStr = twoDigits(seconds);
  return secondsStr;
}

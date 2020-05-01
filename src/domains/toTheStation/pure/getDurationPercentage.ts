import moment from "moment";

export default function getDurationPercentage(
  a: moment.Duration,
  b: moment.Duration
) {
  if (
    !a ||
    !b ||
    !moment.isDuration(a) ||
    !moment.isDuration(b) ||
    !a.isValid() ||
    !b.isValid()
  )
    return Number.NaN;

  return (a.asMilliseconds() / b.asMilliseconds()) * 100;
}

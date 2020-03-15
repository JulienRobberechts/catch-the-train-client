import moment from "moment";

export default function getDurationPercentage(a, b) {
  if (
    !a ||
    !b ||
    !moment.isDuration(a) ||
    !moment.isDuration(b) ||
    !a.isValid() ||
    !b.isValid()
  )
    return Number.NaN;

  return (a.valueOf() / b.valueOf()) * 100;
}

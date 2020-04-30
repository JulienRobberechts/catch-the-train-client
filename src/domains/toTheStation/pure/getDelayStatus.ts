import DelayStatus from "./delayStatus";

export default function getDelayStatus(
  delayDuration: number,
  onTimeMarginDelaySeconds: number
) {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (isNaN(delayDurationSeconds)) return DelayStatus.Invalid;
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return DelayStatus.Early;
  if (delayDurationSeconds < -onTimeMarginDelaySeconds) return DelayStatus.Late;
  return DelayStatus.OnTime;
}

import DELAY_STATUS from "./delayStatus";

export default function getDelayStatus(
  delayDuration,
  onTimeMarginDelaySeconds
) {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (isNaN(delayDurationSeconds)) return DELAY_STATUS.INVALID;
  if (delayDurationSeconds > onTimeMarginDelaySeconds)
    return DELAY_STATUS.EARLY;
  if (delayDurationSeconds < -onTimeMarginDelaySeconds)
    return DELAY_STATUS.LATE;
  return DELAY_STATUS.ON_TIME;
}

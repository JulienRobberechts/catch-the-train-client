export default function getDelayStatus(
  delayDuration,
  onTimeMarginDelaySeconds
) {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (isNaN(delayDurationSeconds)) return "invalid";
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return "early";
  if (delayDurationSeconds < -onTimeMarginDelaySeconds) return "late";
  return "ontime";
}

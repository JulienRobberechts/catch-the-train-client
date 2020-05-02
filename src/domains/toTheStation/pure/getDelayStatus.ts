import DelayStatus from "./delayStatus";
import { Duration } from "moment";

export default function getDelayStatus(
  delayDuration: Duration,
  onTimeMarginDelaySeconds: number
) {
  if (!delayDuration.isValid()) return DelayStatus.Invalid;
  const delayDurationSeconds = delayDuration.asMilliseconds() / 1000;
  if (isNaN(delayDurationSeconds)) return DelayStatus.Invalid;
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return DelayStatus.Early;
  if (delayDurationSeconds < -onTimeMarginDelaySeconds) return DelayStatus.Late;
  return DelayStatus.OnTime;
}

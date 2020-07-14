import DelayStatus from "./delayStatus";
import { Duration } from "moment";

function getDelayStatus(
  delayDuration: Duration,
  onTimeMarginDelaySeconds: number
) {
  if (!delayDuration.isValid()) return DelayStatus.Invalid;
  const delayDurationSeconds = delayDuration.asMilliseconds() / 1000;
  if (isNaN(delayDurationSeconds)) return DelayStatus.Invalid;
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return DelayStatus.Early;

  // TODO: implement other DelayStatus
  if (delayDurationSeconds < -onTimeMarginDelaySeconds)
    return DelayStatus.LateWalkFast;

  return DelayStatus.OnTime;
}

function getLateStatus(
  delayDuration: Duration,
  onTimeMarginDelaySeconds: number
) {
  if (!delayDuration.isValid()) return DelayStatus.Invalid;
  const delayDurationSeconds = delayDuration.asMilliseconds() / 1000;
  if (isNaN(delayDurationSeconds)) return DelayStatus.Invalid;
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return DelayStatus.Early;

  // TODO: implement other DelayStatus
  if (delayDurationSeconds < -onTimeMarginDelaySeconds)
    return DelayStatus.LateWalkFast;

  return DelayStatus.OnTime;
}

export { getDelayStatus as default, getLateStatus };

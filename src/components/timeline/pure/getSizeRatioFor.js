import { getDurationPercentage } from "../../../domains/toTheStation/pure";

export default function getSizeRatioFor(targetDuration) {
  return duration => {
    const percentage = getDurationPercentage(duration, targetDuration);
    return convertToSizeRatio(percentage);
  };
}

export function convertToSizeRatio(percentage) {
  if (!percentage || isNaN(percentage) || percentage < 0) {
    return 0;
  }
  if (isFinite(percentage)) {
    return percentage;
  }
  return 100;
}

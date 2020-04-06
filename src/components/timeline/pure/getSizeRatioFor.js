import { getDurationPercentage } from "../../../domains/toTheStation/pure";

export default function getSizeRatioFor(departureDuration) {
  return (duration) => {
    const percentage = getDurationPercentage(duration, departureDuration);
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

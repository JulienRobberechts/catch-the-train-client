import { RawDeparture } from "../types";

export default function getMatchingDeparture(
  allDepartures: RawDeparture[],
  trainCode: string
) {
  if (!allDepartures) {
    return null;
  }
  const departureIndex = Math.max(
    allDepartures.findIndex((departure) => departure.trainCode === trainCode),
    0
  );
  // if found:
  // if not found: return closest to the time
  return allDepartures[departureIndex];
}

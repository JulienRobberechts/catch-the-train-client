import { getStation } from "./pure/station";
import { importStations } from "./dataAccess";

export function getStationBySlug(stationSlug: string | undefined) {
  const allStation = importStations();
  return getStation(stationSlug, allStation);
}

export function getNetworkByKey(networkKey: string) {
  if (!networkKey || networkKey !== "rers") {
    throw Error("invalid networkKey " + networkKey);
  }
  return { key: "rers", name: "RER" };
}

export function getLineByKey(lineKey: string) {
  if (!lineKey || lineKey !== "A") {
    throw Error("invalid lineKey " + lineKey);
  }
  return { key: "A", name: "A" };
}

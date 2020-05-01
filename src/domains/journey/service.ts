import {
  calculateMissionsForJourney,
  formatMissionsSchedules,
} from "./pure/missionSchedule";
import { getStation } from "./pure/station";
import {
  importMissionsCodes,
  importMissionsSchedules,
  importStations,
} from "./dataAccess";

export function getMissionsSchedules() {
  const missionsCodes = importMissionsCodes();
  const missionsSchedules = importMissionsSchedules(missionsCodes);
  return formatMissionsSchedules(missionsSchedules);
}

export function getMissions(departureStation: string, arrivalStation: string) {
  const missionsSchedules = getMissionsSchedules();
  const missions = calculateMissionsForJourney(
    missionsSchedules,
    departureStation,
    arrivalStation
  );
  return missions;
}

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

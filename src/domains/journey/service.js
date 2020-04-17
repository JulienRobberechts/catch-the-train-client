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

export function getMissions(departureStation, arrivalStation) {
  const missionsSchedules = getMissionsSchedules();
  const missions = calculateMissionsForJourney(
    missionsSchedules,
    departureStation,
    arrivalStation
  );
  return missions;
}

export function getStationBySlug(stationSlug) {
  const allStation = importStations();
  return getStation(stationSlug, allStation);
}

export function getNetworkByKey(networkKey) {
  if (!networkKey || networkKey !== "rers") {
    throw Error("invalid networkKey " + networkKey);
  }
  return { key: "rers", name: "RER" };
}

export function getLineByKey(lineKey) {
  if (!lineKey || lineKey !== "A") {
    throw Error("invalid lineKey " + lineKey);
  }
  return { key: "A", name: "A" };
}

import {
  calculateMissionsForJourney,
  formatMissionsSchedules,
} from "./pure/missionSchedule";
import { importMissionsCodes, importMissionsSchedules } from "./dataAccess";

export function getMissionsSchedules() {
  const missionsCodes = importMissionsCodes();
  const missionsSchedules = importMissionsSchedules(missionsCodes);
  return formatMissionsSchedules(missionsSchedules);
}

export default function getMissions(departureStation, arrivalStation) {
  const missionsSchedules = getMissionsSchedules();
  const missions = calculateMissionsForJourney(
    missionsSchedules,
    departureStation,
    arrivalStation
  );
  return missions;
}

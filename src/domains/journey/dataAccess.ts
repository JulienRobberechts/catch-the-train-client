import missions from "../../data/ratp/rers/A/missions.json";
import stations from "../../data/ratp/rers/A/stations.json";
import { MissionStationDefinition } from "../../data/ratp/rers/A/types";

export function importMissionsCodes() {
  return missions;
}

export interface MissionsSchedule {
  mission: string;
  result: MissionStationDefinition;
}

export function importMissionsSchedules(
  missionCodes: string[]
): MissionsSchedule[] {
  const missionsSchedules = missionCodes.map((missionCode) => ({
    mission: missionCode,
    ...require(`../../data/ratp/rers/A/stations-${missionCode}.json`),
  }));
  return missionsSchedules;
}

export function importStations() {
  return stations;
}

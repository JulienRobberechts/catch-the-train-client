import missions from "../../data/ratp/rers/A/missions.json";

export function importMissionsCodes() {
  return missions;
}

export function importMissionsSchedules(missionCodes) {
  const missionsSchedules = missionCodes.map((missionCode) => ({
    mission: missionCode,
    ...require(`../../data/ratp/rers/A/stations-${missionCode}.json`),
  }));
  return missionsSchedules;
}

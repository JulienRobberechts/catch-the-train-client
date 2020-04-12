// import missions from "../../../data/ratp/rers/A/missions.json";

export const pathForMissionSchedule = (missionCode) =>
  `../../data/ratp/rers/A/stations-${missionCode}.json`;

export function importMissionsCodes() {
  const missions = ["NANI", "NOTE", "QIKI"];
  return missions;
}

export function importMissionsSchedules(missionCodes) {
  const missionsSchedules = missionCodes.map((missionCode) => ({
    mission: missionCode,
    ...require(pathForMissionSchedule(missionCode)),
  }));
  return missionsSchedules;
}

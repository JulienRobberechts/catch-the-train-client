import {
  loadStationConfigurations,
  saveStationConfigurations,
} from "./stationPreferences";

export function saveAccessDuration(
  station: string,
  accessDurationSeconds: number
) {
  const allConfigs = loadStationConfigurations();

  if (!allConfigs[station]) {
    allConfigs[station] = {};
  }
  allConfigs[station].accessDurationSeconds = accessDurationSeconds;
  saveStationConfigurations(allConfigs);
}

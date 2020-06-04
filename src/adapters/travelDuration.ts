import {
  loadStationConfigurations,
  saveStationConfigurations,
} from "./stationPreferences";

export function saveTravelDuration(
  station: string,
  travelDurationSeconds: number
) {
  const allConfigs = loadStationConfigurations();

  if (!allConfigs[station]) {
    allConfigs[station] = {};
  }
  allConfigs[station].travelDurationSeconds = travelDurationSeconds;
  saveStationConfigurations(allConfigs);
}

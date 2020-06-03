import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";

interface StationConfigurationStorage {
  travelDurationSeconds?: number;
  accessDurationSeconds?: number;
}

const LocalStorageKey_StationConfigurations = "stations";

export function loadStationConfigurations() {
  return loadDataFromLocalStorage(LocalStorageKey_StationConfigurations) ?? {};
}

export function saveStationConfigurations(
  configs: StationConfigurationStorage[]
) {
  saveDataIntoLocalStorage(LocalStorageKey_StationConfigurations, configs);
}

export function saveSingleStationConfiguration(
  station: string,
  stationConfig: StationConfigurationStorage
) {
  const allConfigs = loadStationConfigurations();
  allConfigs[station] = stationConfig;
  saveStationConfigurations(allConfigs);
}

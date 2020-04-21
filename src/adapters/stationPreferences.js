import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";

const LocalStorageKey_StationConfigurations = "stations";

export function getStationConfigurations() {
  return loadDataFromLocalStorage(LocalStorageKey_StationConfigurations) ?? {};
}

export function saveStationConfigurations(configs) {
  saveDataIntoLocalStorage(LocalStorageKey_StationConfigurations, configs);
}

export function saveSingleStationConfiguration(station, stationConfig) {
  const allConfigs = getStationConfigurations();
  allConfigs[station] = stationConfig;
  saveStationConfigurations(allConfigs);
}

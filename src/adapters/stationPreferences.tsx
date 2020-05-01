import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";
import { StationConfiguration } from "../domains/station/types";

const LocalStorageKey_StationConfigurations = "stations";

export function loadStationConfigurations() {
  return loadDataFromLocalStorage(LocalStorageKey_StationConfigurations) ?? {};
}

export function saveStationConfigurations(configs: StationConfiguration[]) {
  saveDataIntoLocalStorage(LocalStorageKey_StationConfigurations, configs);
}

export function saveSingleStationConfiguration(
  station: string,
  stationConfig: StationConfiguration
) {
  const allConfigs = loadStationConfigurations();
  allConfigs[station] = stationConfig;
  saveStationConfigurations(allConfigs);
}

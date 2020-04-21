import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";

// Local storage keys
const lsDeparture = "departure";
const lsStationTravelDurationPrefix = "travel-";
const lsStationAccessDurationPrefix = "access-";

const LocalStorageKey_StationConfigurations = "stations";

// TO USE
export function getStationConfigurations() {
  return loadDataFromLocalStorage(LocalStorageKey_StationConfigurations) ?? {};
}

export function saveStationConfigurations(config) {
  saveDataIntoLocalStorage(LocalStorageKey_StationConfigurations, config);
}

// to remove
export function getStationPreferences() {
  const departure = localStorage.getItem(lsDeparture);
  if (!departure) return {};

  const lsStationTravelDuration = lsStationTravelDurationPrefix + departure;
  const lsStationAccessDuration = lsStationAccessDurationPrefix + departure;

  return {
    station: departure,
    travelDuration: localStorage.getItem(lsStationTravelDuration) ?? undefined,
    accessDuration: localStorage.getItem(lsStationAccessDuration) ?? undefined,
  };
}

export function setStationTravelDuration(travelDuration) {
  const departure = localStorage.getItem(lsDeparture);
  if (!departure) return {};

  const lsStationTravelDuration = lsStationTravelDurationPrefix + departure;

  localStorage.setItem(lsStationTravelDuration, travelDuration);
}

export function setStationAccessDuration(accessDuration) {
  const departure = localStorage.getItem(lsDeparture);
  if (!departure) return {};

  const lsStationAccessDuration = lsStationAccessDurationPrefix + departure;

  localStorage.setItem(lsStationAccessDuration, accessDuration);
}

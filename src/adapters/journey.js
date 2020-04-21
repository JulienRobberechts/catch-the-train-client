import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";
const LocalStorageKey_CurrentJourney = "journey";

export function getJourney() {
  return loadDataFromLocalStorage(LocalStorageKey_CurrentJourney) ?? undefined;
}

export function setJourney(item) {
  saveDataIntoLocalStorage(LocalStorageKey_CurrentJourney, item);
}

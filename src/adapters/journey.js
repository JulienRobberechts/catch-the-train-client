import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";
const LocalStorageKey_CurrentJourney = "journey";

export function loadJourney() {
  return loadDataFromLocalStorage(LocalStorageKey_CurrentJourney) ?? undefined;
}

export function saveJourney(item) {
  saveDataIntoLocalStorage(LocalStorageKey_CurrentJourney, item);
}

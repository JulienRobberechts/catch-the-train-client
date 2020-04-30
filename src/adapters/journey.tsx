import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";
const LocalStorageKey_CurrentJourney = "journey";

export interface Journey {
  network: string;
  line: string;
  departure: string;
  destination: string;
}

export function loadJourney() {
  return loadDataFromLocalStorage(LocalStorageKey_CurrentJourney) ?? undefined;
}

export function saveJourney(item: Journey) {
  saveDataIntoLocalStorage(LocalStorageKey_CurrentJourney, item);
}

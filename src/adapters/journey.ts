import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";
import { FullJourney } from "../domains/journey/types";

const LocalStorageKey_CurrentJourney = "journey";

export function loadJourney() {
  return loadDataFromLocalStorage(LocalStorageKey_CurrentJourney) ?? undefined;
}

export function saveJourney(item: FullJourney) {
  saveDataIntoLocalStorage(LocalStorageKey_CurrentJourney, item);
}

import {
  loadDataFromLocalStorage,
  saveDataIntoLocalStorage,
} from "./localStorage";
import { Journey } from "../domains/journey/types";

const LocalStorageKey_CurrentJourney = "journey";

export function loadJourney() {
  return loadDataFromLocalStorage(LocalStorageKey_CurrentJourney) ?? undefined;
}

export function saveJourney(item: Journey) {
  saveDataIntoLocalStorage(LocalStorageKey_CurrentJourney, item);
}

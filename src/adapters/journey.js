// Local storage keys
// const lsNetwork = "network";
// const lsLine = "line";
// const lsDeparture = "departure";
// const lsDestination = "destination";

const LocalStorageKey_CurrentJourney = "journey";

export function getJourney() {
  try {
    const serializedItem = localStorage.getItem(LocalStorageKey_CurrentJourney);
    if (serializedItem === null) {
      return undefined;
    }
    return JSON.parse(serializedItem);
    // return {
    //   network: localStorage.getItem(lsNetwork),
    //   line: localStorage.getItem(lsLine),
    //   departure: localStorage.getItem(lsDeparture),
    //   destination: localStorage.getItem(lsDestination),
    // };
  } catch (error) {
    return undefined;
  }
}

export function setJourney(item) {
  try {
    const serializedItem = JSON.stringify(item);
    localStorage.setItem(LocalStorageKey_CurrentJourney, serializedItem);
  } catch (error) {
    // Ignore
  }
}

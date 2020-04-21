// Local storage keys
const lsNetwork = "network";
const lsLine = "line";
const lsDeparture = "departure";
const lsDestination = "destination";

export function getJourney() {
  try {
    return {
      network: localStorage.getItem(lsNetwork),
      line: localStorage.getItem(lsLine),
      departure: localStorage.getItem(lsDeparture),
      destination: localStorage.getItem(lsDestination),
    };
  } catch (error) {
    return undefined;
  }
}

export function setJourney({ network, line, departure, destination }) {
  try {
    localStorage.setItem(lsNetwork, network);
    localStorage.setItem(lsLine, line);
    localStorage.setItem(lsDeparture, departure);
    localStorage.setItem(lsDestination, destination);
  } catch (error) {}
}

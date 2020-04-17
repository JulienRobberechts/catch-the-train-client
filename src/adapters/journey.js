// Local storage keys
const lsNetwork = "network";
const lsLine = "line";
const lsDeparture = "departure";
const lsDestination = "destination";

export function getJourney() {
  return {
    network: localStorage.getItem(lsNetwork),
    line: localStorage.getItem(lsLine),
    departure: localStorage.getItem(lsDeparture),
    destination: localStorage.getItem(lsDestination),
  };
}

export function setJourney({ network, line, departure, destination }) {
  localStorage.setItem(lsNetwork, network);
  localStorage.setItem(lsLine, line);
  localStorage.setItem(lsDeparture, departure);
  localStorage.setItem(lsDestination, destination);
}

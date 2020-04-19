// Local storage keys
const lsDeparture = "departure";
const lsStationTravelDurationPrefix = "travel-";
const lsStationAccessDurationPrefix = "access-";

export function getStationPreferences() {
  const departure = localStorage.getItem(lsDeparture);
  if (!departure) return {};

  const lsStationTravelDuration = lsStationTravelDurationPrefix + departure;
  // == waitingDelaySeconds
  const lsStationAccessDuration = lsStationAccessDurationPrefix + departure;

  return {
    station: departure,
    travelDuration: localStorage.getItem(lsStationTravelDuration),
    accessDuration: localStorage.getItem(lsStationAccessDuration),
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

  // == waitingDelaySeconds
  const lsStationAccessDuration = lsStationAccessDurationPrefix + departure;

  localStorage.setItem(lsStationAccessDuration, accessDuration);
}

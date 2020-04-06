import { selectAllDepartures } from "../timeTable/selectors";
import {
  getMatchingDeparture,
  calculateEnhancedToTheStation,
  enhancedTimeTable,
} from "./pure";

import {
  selectNow,
  selectUserConfiguration,
  selectStationConfiguration,
  selectCurrentTrainCode,
} from "../toTheStation/selectors";

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.

export const selectDepartureByTrainCode = (trainCode) => (state) => {
  const rawDepartures = selectAllDepartures(state);

  if (!rawDepartures) {
    return null;
  }
  return getMatchingDeparture(rawDepartures, trainCode);
};

export const selectEnhancedTimeTable = (state) => {
  const currentTime = selectNow(state);
  const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectStationConfiguration(state);
  const rawDepartures = selectAllDepartures(state);
  const timeTable = enhancedTimeTable({
    currentTime,
    currentTrainCode,
    userConfiguration,
    stationConfiguration,
    rawDepartures,
  });

  console.log(timeTable);

  return timeTable;
};

export const selectEnhancedToTheStation = (state) => {
  const currentTime = selectNow(state);
  const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectStationConfiguration(state);
  const rawDepartures = selectAllDepartures(state);

  return calculateEnhancedToTheStation({
    currentTime,
    currentTrainCode,
    userConfiguration,
    stationConfiguration,
    rawDepartures,
  });
};

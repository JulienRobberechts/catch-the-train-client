import { selectAllDepartures } from "../timeTable/selectors";
import {
  selectNow,
  selectUserConfiguration,
  selectCurrentTrainCode,
} from "../toTheStation/selectors";
import { selectCurrentStationConfiguration } from "./selectors";
import { enhanceTimeTable } from "./pure";

// ---------------------------------------------------
//                  Super-selectors
//   Mashup of timeTable and toTheStation in order
//        to provide a ready-to-use selectors.
// ---------------------------------------------------

export const selectEnhancedTimeTable = (state) => {
  // from timeTable
  const rawDepartures = selectAllDepartures(state);
  // from toTheStation
  const currentTime = selectNow(state);
  const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectCurrentStationConfiguration(state);

  const timeTable = enhanceTimeTable({
    currentTime,
    currentTrainCode,
    userConfiguration,
    stationConfiguration,
    rawDepartures,
  });

  return timeTable;
};

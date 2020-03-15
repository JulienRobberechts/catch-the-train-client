import timeTableReducer, {
  initialState as timeTableInitialState,
  mockTimeTable,
  selectConfigIsValid,
  selectStationCode,
  selectRoute,
  selectEnhancedTimeTable
} from "../timeTable/slice";

import toTheStationReducer, {
  initialState,
  mockToTheStation,
  selectNow,
  selectToTheStation
} from "../toTheStation/slice";

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.

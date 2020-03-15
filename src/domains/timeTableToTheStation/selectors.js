import timeTableReducer, {
  initialState as timeTableInitialState,
  mockTimeTable
} from "../timeTable/slice";

import {
  selectConfigIsValid,
  selectStationCode,
  selectRoute,
  selectEnhancedTimeTable
} from "../timeTable/selectors";

import toTheStationReducer, {
  initialState as toTheStationInitialState,
  mockToTheStation
} from "../toTheStation/slice";

import { selectNow, selectToTheStation } from "../toTheStation/selectors";

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.

import timeTableReducer, {
  initialState as timeTableInitialState,
} from "../timeTable/slice";

import toTheStationReducer, {
  initialState as toTheStationInitialState,
} from "../toTheStation/slice";

import { selectEnhancedTimeTable } from "./selectors";

describe("slice timeTable", () => {
  describe("initial state", () => {
    const rootState = {
      timeTable: timeTableInitialState,
      toTheStation: toTheStationInitialState,
    };
    it("'selectEnhancedTimeTable' should return falsy", () => {
      expect(selectEnhancedTimeTable(rootState)).toBeFalsy();
    });
  });
});

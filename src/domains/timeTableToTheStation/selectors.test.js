import timeTableReducer, {
  initialState as timeTableInitialState,
  mockTimeTable
} from "../timeTable/slice";

import toTheStationReducer, {
  initialState as toTheStationInitialState,
  mockToTheStation
} from "../toTheStation/slice";

import { selectEnhancedTimeTable } from "./selectors";

describe("slice timeTable", () => {
  describe("initial state", () => {
    const rootState = {
      timeTable: timeTableInitialState,
      toTheStation: toTheStationInitialState
    };
    it("'selectEnhancedTimeTable' should return falsy", () => {
      expect(selectEnhancedTimeTable(rootState)).toBeFalsy();
    });
  });
  describe("after 'mockTimeTable' action, state", () => {
    let rootState;
    beforeEach(() => {
      const timeTable = timeTableReducer(
        timeTableInitialState,
        mockTimeTable()
      );
      const toTheStation = toTheStationReducer(
        toTheStationInitialState,
        mockToTheStation()
      );
      rootState = { timeTable, toTheStation };
    });
    it("'selectEnhancedTimeTable' should return data", () => {
      expect(selectEnhancedTimeTable(rootState)).toEqual(expect.anything());
      expect(selectEnhancedTimeTable(rootState)).toMatchSnapshot();
    });
  });
});

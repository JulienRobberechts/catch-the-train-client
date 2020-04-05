import reducer, { initialState, fetch } from "./slice";

import {
  selectTimeTableContext,
  selectRequestStatus,
  selectAllDepartures,
} from "./selectors";

describe("slice timeTable", () => {
  describe("initial state", () => {
    const rootState = { timeTable: initialState };
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeFalsy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeFalsy();
    });
    it("'selectTimeTableContext' should return falsy", () => {
      expect(selectTimeTableContext(rootState)).toBeFalsy();
    });
    it("'selectAllDepartures' should return falsy", () => {
      expect(selectAllDepartures(rootState)).toBeFalsy();
    });
  });
  describe("after first requestStart", () => {
    let rootState;
    beforeEach(() => {
      const timeTable = reducer(initialState, fetch());
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeTruthy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeFalsy();
    });
    it("'selectTimeTableContext' should return falsy", () => {
      expect(selectTimeTableContext(rootState)).toBeFalsy();
    });
    it("'selectAllDepartures' should return falsy", () => {
      expect(selectAllDepartures(rootState)).toBeFalsy();
    });
  });
});

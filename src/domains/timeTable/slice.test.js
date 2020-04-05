import reducer, {
  initialState,
  requestStart,
  requestError,
  requestSuccess,
} from "./slice";

import {
  selectTimeTableContext,
  selectRequestStatus,
  selectAllDepartures,
} from "./selectors";

const sampleContextRerAChatelet = {
  at: "2020-03-10T09:22:30+01:00",
  provider: "ratp",
  network: "rers",
  line: "a",
  station: {
    name: "Chatelet-Les-Halles",
    slug: "chatelet+les+halles",
  },
  missions: ["ZEBU"],
};
const sampleDepartures = [{ trainCode: "T1" }, { trainCode: "T2" }];

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
    const stateBefore = initialState;
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestStart());
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

  describe("after first requestSuccess", () => {
    let rootState;
    const stateBefore = {
      loading: true,
      error: false,
      data: undefined,
    };
    beforeEach(() => {
      const timeTable = reducer(
        stateBefore,
        requestSuccess({
          context: sampleContextRerAChatelet,
          departures: sampleDepartures,
        })
      );
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeFalsy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeTruthy();
    });
    it("'selectTimeTableContext' should return results", () => {
      expect(selectTimeTableContext(rootState)).toEqual(
        sampleContextRerAChatelet
      );
    });
    it("'selectAllDepartures' should return results", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDepartures);
    });
  });

  describe("after first requestError", () => {
    let rootState;
    const stateBefore = {
      loading: true,
      error: false,
      data: undefined,
    };
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestError());
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeFalsy();
      expect(actualStatus.error).toBeTruthy();
      expect(actualStatus.hasData).toBeFalsy();
    });
    it("'selectTimeTableContext' should return results", () => {
      expect(selectTimeTableContext(rootState)).toBeFalsy();
    });
    it("'selectAllDepartures' should return results", () => {
      expect(selectAllDepartures(rootState)).toBeFalsy();
    });
  });
});

import reducer, {
  initialState,
  requestStart,
  requestError,
  requestSuccess,
} from "./slice";
import { selectRequestStatus, selectAllDepartures } from "./selectors";
import { selectCurrentJourney } from "../journey/selectors";

const sampleRequestRerAChatelet = {
  network: "rers",
  line: "a",
  station: "chatelet+les+halles",
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
    it("'selectCurrentJourney' should return falsy", () => {
      expect(selectCurrentJourney(rootState)).toBeFalsy();
    });
    it("'selectAllDepartures' should return an empty array", () => {
      expect(selectAllDepartures(rootState)).toEqual([]);
    });
  });

  describe("after first requestStart", () => {
    let rootState;
    const stateBefore = initialState;
    beforeEach(() => {
      const timeTable = reducer(
        stateBefore,
        requestStart(sampleRequestRerAChatelet)
      );
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeTruthy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeFalsy();
    });
    // it("'selectCurrentJourney' should return data", () => {
    //   expect(selectCurrentJourney(rootState)).toEqual(
    //     sampleRequestRerAChatelet
    //   );
    // });
    it("'selectAllDepartures' should return an empty array", () => {
      expect(selectAllDepartures(rootState)).toEqual([]);
    });
  });

  describe("after first requestSuccess", () => {
    let rootState;
    const stateBefore = {
      loading: true,
      error: false,
      request: sampleRequestRerAChatelet,
      data: undefined,
    };
    beforeEach(() => {
      const timeTable = reducer(
        stateBefore,
        requestSuccess({
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
    it("'selectCurrentJourney' should return results", () => {
      expect(selectCurrentJourney(rootState)).toEqual(
        sampleRequestRerAChatelet
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
    const error503 = {
      code: 503,
      msg: "Le service est indisponible pour le moment",
      level: "LOW",
    };
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestError(error503));
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeFalsy();
      expect(actualStatus.error).toEqual(error503);
      expect(actualStatus.hasData).toBeFalsy();
    });
    it("'selectCurrentJourney' should return results", () => {
      expect(selectCurrentJourney(rootState)).toBeFalsy();
    });
    it("'selectAllDepartures' should return an empty array", () => {
      expect(selectAllDepartures(rootState)).toEqual([]);
    });
  });
});

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

const sampleContextRerAChateletV1 = {
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

const sampleDeparturesV1 = [{ trainCode: "T1" }, { trainCode: "T2" }];

const sampleContextRerAChateletV2 = {
  at: "2020-03-10T09:25:00+01:00",
  provider: "ratp",
  network: "rers",
  line: "a",
  station: {
    name: "Chatelet-Les-Halles",
    slug: "chatelet+les+halles",
  },
  missions: ["ZEBU"],
};

const sampleDeparturesV2 = [{ trainCode: "T2" }, { trainCode: "T3" }];

describe("slice timeTable", () => {
  describe("after second requestStart", () => {
    let rootState;
    const stateBefore = {
      loading: false,
      error: false,
      data: {
        context: sampleContextRerAChateletV1,
        departures: sampleDeparturesV1,
      },
    };
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestStart());
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeTruthy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeTruthy();
    });
    it("'selectTimeTableContext' should return falsy", () => {
      expect(selectTimeTableContext(rootState)).toEqual(
        sampleContextRerAChateletV1
      );
    });
    it("'selectAllDepartures' should return falsy", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV1);
    });
  });

  describe("after second requestSuccess", () => {
    let rootState;
    const stateBefore = {
      loading: true,
      error: false,
      data: {
        context: sampleContextRerAChateletV1,
        departures: sampleDeparturesV1,
      },
    };
    beforeEach(() => {
      const timeTable = reducer(
        stateBefore,
        requestSuccess({
          context: sampleContextRerAChateletV2,
          departures: sampleDeparturesV2,
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
        sampleContextRerAChateletV2
      );
    });
    it("'selectAllDepartures' should return results", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV2);
    });
  });

  describe("after second requestError", () => {
    let rootState;
    const stateBefore = {
      loading: true,
      error: false,
      data: {
        context: sampleContextRerAChateletV1,
        departures: sampleDeparturesV1,
      },
    };
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestError());
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeFalsy();
      expect(actualStatus.error).toBeTruthy();
      // data are staying even though they are not corresponding to the error!
      expect(actualStatus.hasData).toBeTruthy();
    });
    it("'selectTimeTableContext' should return results", () => {
      expect(selectTimeTableContext(rootState)).toEqual(
        sampleContextRerAChateletV1
      );
    });
    it("'selectAllDepartures' should return results", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV1);
    });
  });

  describe("after third requestStart after error", () => {
    let rootState;
    const stateBefore = {
      loading: false,
      error: "Error: invalid station",
      data: {
        context: sampleContextRerAChateletV1,
        departures: sampleDeparturesV1,
      },
    };
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestStart());
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeTruthy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeTruthy();
    });
    it("'selectTimeTableContext' should return falsy", () => {
      expect(selectTimeTableContext(rootState)).toEqual(
        sampleContextRerAChateletV1
      );
    });
    it("'selectAllDepartures' should return falsy", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV1);
    });
  });
});

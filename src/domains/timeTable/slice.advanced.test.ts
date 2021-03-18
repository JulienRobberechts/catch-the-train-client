import reducer, {
  requestStart,
  requestError,
  requestSuccess,
} from "./slice";

import { selectRequestStatus, selectAllDepartures } from "./selectors";
import { ReduxStateTimeTable } from "./types";

type RootState = {
  timeTable: ReduxStateTimeTable;
};
const sampleDeparturesV1 = [{ trainCode: "T1" }, { trainCode: "T2" }];
const sampleDeparturesV2 = [{ trainCode: "T2" }, { trainCode: "T3" }];

describe("slice timeTable", () => {
  describe("after second requestStart", () => {
    let rootState: RootState;
    const stateBefore = {
      loading: false,
      error: false,
      data: {
        departures: sampleDeparturesV1,
      },
    };
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestStart({}));
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeTruthy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeTruthy();
    });
    it("'selectAllDepartures' should return V1", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV1);
    });
  });

  describe("after second requestSuccess", () => {
    let rootState: RootState;
    const stateBefore = {
      loading: true,
      error: false,
      data: {
        departures: sampleDeparturesV1,
      },
    };
    beforeEach(() => {
      const timeTable = reducer(
        stateBefore,
        requestSuccess({
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
    it("'selectAllDepartures' should return V2", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV2);
    });
  });

  describe("after second requestError", () => {
    let rootState: RootState;
    const stateBefore = {
      loading: true,
      error: false,
      data: {
        departures: sampleDeparturesV1,
      },
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
      // data are staying even though they are not corresponding to the error!
      expect(actualStatus.hasData).toBeTruthy();
    });
    it("'selectAllDepartures' should return V1", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV1);
    });
  });

  describe("after third requestStart after error", () => {
    let rootState: RootState;
    const stateBefore = {
      loading: false,
      error: "Error: invalid station",
      data: {
        departures: sampleDeparturesV1,
      },
    };
    beforeEach(() => {
      const timeTable = reducer(stateBefore, requestStart({}));
      rootState = { timeTable };
    });
    it("'selectRequestStatus' should return results", () => {
      const actualStatus = selectRequestStatus(rootState);
      expect(actualStatus.loading).toBeTruthy();
      expect(actualStatus.error).toBeFalsy();
      expect(actualStatus.hasData).toBeTruthy();
    });
    it("'selectAllDepartures' should return V1", () => {
      expect(selectAllDepartures(rootState)).toEqual(sampleDeparturesV1);
    });
  });
});

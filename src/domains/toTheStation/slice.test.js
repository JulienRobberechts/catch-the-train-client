import reducer, {
  initialState,
  setUserConfiguration,
  setStationConfiguration,
  chooseTrain,
  updateTime,
} from "./slice";

import {
  selectUserConfiguration,
  selectCurrentTrainCode,
  selectNow,
} from "./selectors";

describe("slice toTheStation", () => {
  describe("initial state", () => {
    const rootState = { toTheStation: initialState };
    it("'selectNow' should return falsy", () => {
      const now = selectNow(rootState);
      expect(now).toBeTruthy();
    });
    it("'selectUserConfiguration' should not return data", () => {
      expect(selectUserConfiguration(rootState)).toBeFalsy();
    });
    it("'selectCurrentTrainCode' should not return data", () => {
      expect(selectCurrentTrainCode(rootState)).toBeFalsy();
    });
  });

  describe("after setUserConfiguration", () => {
    let rootState;
    const userConfiguration = {
      onTimeMarginDelaySeconds: 22,
      timezone: "+04:00",
    };
    beforeEach(() => {
      const toTheStation = reducer(
        initialState,
        setUserConfiguration(userConfiguration)
      );
      rootState = { toTheStation };
    });
    it("'selectUserConfiguration' should return results", () => {
      const actualUserConfiguration = selectUserConfiguration(rootState);
      expect(actualUserConfiguration).toEqual(userConfiguration);
    });
  });

  describe("after chooseTrain", () => {
    let rootState;
    const trainCode = "0930";
    beforeEach(() => {
      const toTheStation = reducer(initialState, chooseTrain(trainCode));
      rootState = { toTheStation };
    });
    it("'selectCurrentTrainCode' should return results", () => {
      const actualCurrentTrainCode = selectCurrentTrainCode(rootState);
      expect(actualCurrentTrainCode).toEqual(trainCode);
    });
  });

  describe("after updateTime", () => {
    let rootState;
    const lastTime = "2020-03-10T09:22:33+01:00";
    const refreshInterval = 2000;
    const expectedNextTime = "2020-03-10T09:22:35+01:00";
    beforeEach(() => {
      const toTheStation = reducer(
        initialState,
        updateTime({ calculateByInterval: true, lastTime, refreshInterval })
      );
      rootState = { toTheStation };
    });
    it("'selectNow' should return results", () => {
      const actualNow = selectNow(rootState);
      expect(actualNow).toEqual(expectedNextTime);
    });
  });
});

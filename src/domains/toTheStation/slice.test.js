import reducer, { initialState, chooseTrain, updateTime } from "./slice";
import { selectCurrentTrainCode, selectNow } from "./selectors";

describe("slice toTheStation", () => {
  describe("initial state", () => {
    const rootState = { toTheStation: initialState };
    it("'selectNow' should return falsy", () => {
      const now = selectNow(rootState);
      expect(now).toBeTruthy();
    });
    it("'selectCurrentTrainCode' should not return data", () => {
      expect(selectCurrentTrainCode(rootState)).toBeFalsy();
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

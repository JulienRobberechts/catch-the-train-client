import reducer, {
  initialState,
  setUserConfiguration,
  setStationConfiguration,
} from "./slice";

import { selectUserConfiguration } from "./selectors";

describe("slice station", () => {
  describe("initial state", () => {
    const rootState = { station: initialState };
    it("'selectUserConfiguration' should not return data", () => {
      expect(selectUserConfiguration(rootState)).toBeFalsy();
    });
  });

  describe("after setUserConfiguration", () => {
    let rootState;
    const userConfiguration = {
      onTimeMarginDelaySeconds: 22,
      timezone: "+04:00",
    };
    beforeEach(() => {
      const station = reducer(
        initialState,
        setUserConfiguration(userConfiguration)
      );
      rootState = { station };
    });
    it("'selectUserConfiguration' should return results", () => {
      const actualUserConfiguration = selectUserConfiguration(rootState);
      expect(actualUserConfiguration).toEqual(userConfiguration);
    });
  });
});

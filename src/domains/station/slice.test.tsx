import reducer, { initialState, setUserConfiguration } from "./slice";

import { selectUserConfiguration } from "./selectors";
import { ReduxStateStation } from "./types";

type RootState = {
  station: ReduxStateStation;
};

describe("slice station", () => {
  describe("initial state", () => {
    const rootState: RootState = { station: initialState };
    it("'selectUserConfiguration' should not return data", () => {
      const actualUserConfig = selectUserConfiguration(rootState);
      expect(actualUserConfig?.onTimeMarginDelaySeconds).toBe(50);
    });
  });

  describe("after setUserConfiguration", () => {
    let rootState: RootState;
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

import reducer, {
  initialState,
  setUserConfiguration,
  setStationConfiguration,
} from "./slice";

import {
  selectUserConfiguration,
  selectStationConfigurations,
} from "./selectors";
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
  describe("StationConfiguration", () => {
    const stationConfigurationStGermain = {
      travelDurationSeconds: 487,
      accessDurationSeconds: 94,
    };

    describe("after setStationConfiguration with full config", () => {
      let rootState: RootState;
      const stationConfigurations = {
        "st+germain+en+laye": stationConfigurationStGermain,
      };
      beforeEach(() => {
        const rootState0 = initialState;
        const rootState1 = {
          station: reducer(
            rootState0,
            setStationConfiguration({
              station: "st+germain+en+laye",
              ...stationConfigurationStGermain,
            })
          ),
        };
        rootState = rootState1;
      });
      it("'selectStationConfigurations' should return results", () => {
        const actualStationConfigurations = selectStationConfigurations(
          rootState
        );
        expect(actualStationConfigurations).toEqual(stationConfigurations);
      });
    });
  });
});

import moment from "moment";
import { initialState } from "./slice";

import {
  selectNow,
  selectUserConfiguration,
  selectStationConfiguration,
  selectCurrentTrainCode,
} from "./selectors";

describe("slice toTheStation", () => {
  describe("initial state", () => {
    const rootState = { toTheStation: initialState };
    it("'selectNow' should return falsy", () => {
      const now = moment.parseZone(selectNow(rootState));
      expect(now).toBeTruthy();
    });
    it("'selectUserConfiguration' should not return data", () => {
      expect(selectUserConfiguration(rootState)).toBeFalsy();
    });
    it("'selectStationConfiguration' should not return data", () => {
      expect(selectStationConfiguration(rootState)).toBeFalsy();
    });
    it("'selectCurrentTrainCode' should not return data", () => {
      expect(selectCurrentTrainCode(rootState)).toBeFalsy();
    });
  });
});

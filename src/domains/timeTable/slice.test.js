import reducer, { initialState, mockTimeTable } from "./slice";

import { selectConfigIsValid, selectRoute } from "./selectors";

describe("slice timeTable", () => {
  describe("initial state", () => {
    const rootState = { timeTable: initialState };
    it("'selectConfigIsValid' should return truthy", () => {
      // to change to be false...
      expect(selectConfigIsValid(rootState)).toBeTruthy();
    });
    it("'selectRoute' should return falsy", () => {
      expect(selectRoute(rootState)).toBeFalsy();
    });
  });
});

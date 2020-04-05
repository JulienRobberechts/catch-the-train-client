import moment from "moment";
import { initialState } from "./slice";

import { selectNow, selectToTheStation } from "./selectors";

describe("slice toTheStation", () => {
  describe("initial state", () => {
    const rootState = { toTheStation: initialState };
    it("'selectNow' should return falsy", () => {
      const now = moment(selectNow(rootState));
      expect(now.hours()).toBe(9);
      expect(now.minutes()).toBe(22);
    });
    it("'selectToTheStation' should not return data", () => {
      expect(selectToTheStation(rootState).data).toBeFalsy();
    });
  });
  // describe("after 'mockToTheStation' action, state", () => {
  //   let rootState;
  //   beforeEach(() => {
  //     const toTheStation = reducer(initialState, mockToTheStation());
  //     rootState = { toTheStation };
  //   });
  //   it("'selectNow' should return data", () => {
  //     expect(selectNow(rootState)).toEqual("2020-03-10T09:19:56+01:00");
  //   });
  //   it("'selectToTheStation' should return data", () => {
  //     expect(selectToTheStation(rootState)).toEqual(expect.anything());
  //   });
  // });
});

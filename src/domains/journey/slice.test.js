import reducer, { initialState, setCurrentJourney } from "./slice";
import { selectCurrentJourney } from "./selectors";

const sampleJourneyRerAChatelet = {
  network: "rers",
  line: "a",
  departure: "chatelet+les+halles",
  destination: "chatelet+les+halles",
  missions: ["ZEBU"],
};

describe("slice journey", () => {
  describe("initial state", () => {
    const rootState = { journey: undefined };
    it("'selectCurrentJourney' should return falsy", () => {
      expect(selectCurrentJourney(rootState)).toBeFalsy();
    });
  });

  describe("after reload data (from localstorage)", () => {
    const rootState = { journey: sampleJourneyRerAChatelet };
    it("'selectCurrentJourney' should return falsy", () => {
      expect(selectCurrentJourney(rootState)).toEqual(
        sampleJourneyRerAChatelet
      );
    });
  });

  describe("after setCurrentJourney", () => {
    let rootState;
    const stateBefore = initialState;
    beforeEach(() => {
      const journey = reducer(
        stateBefore,
        setCurrentJourney(sampleJourneyRerAChatelet)
      );
      rootState = { journey };
    });
    it("'selectCurrentJourney' should return data", () => {
      expect(selectCurrentJourney(rootState)).toEqual(
        sampleJourneyRerAChatelet
      );
    });
  });
});

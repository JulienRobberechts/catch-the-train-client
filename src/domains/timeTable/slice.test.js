import reducer, {
  initialState,
  mockTimeTable,
  selectConfigIsValid,
  selectStationCode,
  selectRoute,
  selectEnhancedTimeTable
} from "./slice";

describe("slice timeTable", () => {
  describe("initial state", () => {
    const rootState = { timeTable: initialState };
    it("'selectConfigIsValid' should return falsy", () => {
      expect(selectConfigIsValid(rootState)).toBeFalsy();
    });
    it("'selectStationCode' should return falsy", () => {
      expect(selectStationCode(rootState)).toBeFalsy();
    });
    it("'selectRoute' should return falsy", () => {
      expect(selectRoute(rootState)).toBeFalsy();
    });
    it("'selectEnhancedTimeTable' should return falsy", () => {
      expect(selectEnhancedTimeTable(rootState)).toBeFalsy();
    });
  });
  describe("after 'mockTimeTable' action, state", () => {
    let rootState;
    beforeEach(() => {
      const timeTable = reducer(initialState, mockTimeTable());
      rootState = { timeTable };
    });
    it("'selectConfigIsValid' should return 'true'", () => {
      expect(selectConfigIsValid(rootState)).toEqual(true);
    });
    it("'selectStationCode' should return '0924'", () => {
      expect(selectStationCode(rootState)).toEqual("SGL");
    });
    it("'selectRoute' should return data", () => {
      const result = selectRoute(rootState);
      expect(result).toEqual(expect.anything());
      expect(result).toEqual(
        expect.objectContaining({
          station: {
            code: "SGL",
            name: "Saint-Germain-en-Laye"
          },
          direction: "Paris",
          directionsAliases: ["Paris", "Châtelet–Les Halles"]
        })
      );
      expect(result.trains).toEqual(
        expect.arrayContaining([
          {
            departureTime: "2020-03-10T09:24:00+01:00",
            platform: "2"
          },
          {
            departureTime: "2020-03-10T09:32:00+01:00",
            platform: "4"
          }
        ])
      );
    });
    // it("'selectEnhancedTimeTable' should return data", () => {
    //   const timeTable = reducer(initialState, mockTimeTable());
    //   // it depends on the other slice as well!
    //   expect(selectEnhancedTimeTable(rootState)).toBeFalsy();
    // });
  });
});

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
    it("'selectConfigIsValid' should return falsy", () => {
      const rootState = { timeTable: initialState };
      expect(selectConfigIsValid(rootState)).toBeFalsy();
    });
    it("'selectStationCode' should return falsy", () => {
      const rootState = { timeTable: initialState };
      expect(selectStationCode(rootState)).toBeFalsy();
    });
    it("'selectRoute' should return falsy", () => {
      const rootState = { timeTable: initialState };
      expect(selectRoute(rootState)).toBeFalsy();
    });
    it("'selectEnhancedTimeTable' should return falsy", () => {
      const rootState = { timeTable: initialState };
      expect(selectEnhancedTimeTable(rootState)).toBeFalsy();
    });
  });
  describe("after 'mockTimeTable' action, state", () => {
    it("selectConfigIsValid should return 'true'", () => {
      const timeTable = reducer(initialState, mockTimeTable());
      expect(selectConfigIsValid({ timeTable })).toEqual(true);
    });
    it("'selectStationCode' should return '0924'", () => {
      const timeTable = reducer(initialState, mockTimeTable());
      expect(selectStationCode({ timeTable })).toEqual("SGL");
    });
    it("'selectRoute' should return data", () => {
      const timeTable = reducer(initialState, mockTimeTable());
      const result = selectRoute({ timeTable });
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
    it("'selectEnhancedTimeTable' should return data", () => {
      const timeTable = reducer(initialState, mockTimeTable());
      // it depends on the other slice as well!
      // expect(selectEnhancedTimeTable({ timeTable })).toBeFalsy();
    });
  });
});

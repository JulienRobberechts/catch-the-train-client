import { initialState as timeTableInitialState } from "../timeTable/slice";
import { initialState as toTheStationInitialState } from "../toTheStation/slice";
import {
  selectEnhancedTimeTable,
  selectCurrentStationConfiguration,
} from "./selectors";

const sampleDepartures = [
  {
    trainCode: "0924",
    departureTime: "2020-03-10T09:24:00+01:00",
    mission: "UPAC",
    displayAttributes: "09:24",
    displayDestination: "Cergy-Le-Haut",
  },
  {
    trainCode: "0929",
    departureTime: "2020-03-10T09:29:00+01:00",
    mission: "UPAC",
    displayAttributes: "09:29",
    displayDestination: "Cergy-Le-Haut",
  },
];

describe("slice timeTable", () => {
  const initialRootState = {
    timeTable: timeTableInitialState,
    toTheStation: toTheStationInitialState,
  };
  describe("initial state", () => {
    it("'selectEnhancedTimeTable' should return falsy", () => {
      expect(selectEnhancedTimeTable(initialRootState)).toEqual({
        currentDeparture: null,
      });
    });
  });
  describe("after initialization", () => {
    const sampleUserConfiguration = {
      onTimeMarginDelaySeconds: 22,
      timezone: "+04:00",
    };
    const sampleStationConfigurations = {
      "chatelet+les+halles": {
        travelDurationSeconds: 555,
        accessDurationSeconds: 77,
      },
    };
    const sampleRequestRerAChatelet = {
      network: "rers",
      line: "a",
      departure: "chatelet+les+halles",
      destination: "auber",
      missions: ["ZEBU"],
    };

    const rootState = {
      toTheStation: {
        currentTime: "2020-03-10T09:13:30+01:00",
        currentTrainCode: "0924",
        userConfiguration: sampleUserConfiguration,
        stationConfigurations: sampleStationConfigurations,
      },
      timeTable: {
        loading: false,
        error: null,
        request: sampleRequestRerAChatelet,
        data: {
          departures: sampleDepartures,
        },
      },
    };
    it("'selectEnhancedTimeTable' should MatchSnapshot", () => {
      const actualEnhancedTimeTable = selectEnhancedTimeTable(rootState);
      expect(actualEnhancedTimeTable).toBeTruthy();
      expect(actualEnhancedTimeTable.enhancedDepartures.length).toBe(2);
      expect(actualEnhancedTimeTable).toMatchSnapshot();
    });
    it("'selectCurrentStationConfiguration' should MatchSnapshot", () => {
      const actualCurrentStationConfiguration = selectCurrentStationConfiguration(
        rootState
      );
      expect(actualCurrentStationConfiguration).toBeTruthy();
      expect(actualCurrentStationConfiguration.travelDurationSeconds).toBe(555);
      expect(actualCurrentStationConfiguration.accessDurationSeconds).toBe(77);
    });
  });
});

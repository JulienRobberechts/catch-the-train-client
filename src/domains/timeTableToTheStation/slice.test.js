import { initialState as timeTableInitialState } from "../timeTable/slice";
import { initialState as toTheStationInitialState } from "../toTheStation/slice";
import { selectEnhancedTimeTable } from "./selectors";

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
      expect(selectEnhancedTimeTable(initialRootState)).toBeFalsy();
    });
  });
  describe("after initialization", () => {
    const sampleUserConfiguration = {
      onTimeMarginDelaySeconds: 22,
      timezone: "+04:00",
    };
    const sampleStationConfiguration = {
      station: "chatelet+les+halles",
      travelDurationSeconds: 555,
      waitingDelaySeconds: 77,
    };
    const sampleContextRerAChatelet = {
      at: "2020-03-10T09:22:30+01:00",
      provider: "ratp",
      network: "rers",
      line: "a",
      station: {
        name: "Chatelet-Les-Halles",
        slug: "chatelet+les+halles",
      },
      missions: ["ZEBU"],
    };

    const rootState = {
      toTheStation: {
        currentTime: "2020-03-10T09:13:30+01:00",
        currentTrainCode: "0924",
        userConfiguration: sampleUserConfiguration,
        stationConfiguration: sampleStationConfiguration,
      },
      timeTable: {
        loading: false,
        error: null,
        data: {
          context: sampleContextRerAChatelet,
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
  });
});

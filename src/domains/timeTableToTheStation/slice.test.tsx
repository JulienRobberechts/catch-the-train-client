import { initialState as timeTableInitialState } from "../timeTable/slice";
import { initialState as toTheStationInitialState } from "../toTheStation/slice";
import {
  selectEnhancedTimeTable,
  selectCurrentStationConfiguration,
} from "./selectors";
import { RootState } from "../../redux-store/types";

const sampleDepartures = [
  {
    trainCode: "0824",
    departureTime: "2020-03-10T08:24:00.000Z",
    mission: "UPAC",
    displayAttributes: "08:24",
    displayDestination: "Cergy-Le-Haut",
  },
  {
    trainCode: "0829",
    departureTime: "2020-03-10T08:29:00.000Z",
    mission: "UPAC",
    displayAttributes: "08:29",
    displayDestination: "Cergy-Le-Haut",
  },
];

describe("slice timeTable", () => {
  const initialRootState: RootState = {
    timeTable: timeTableInitialState,
    toTheStation: toTheStationInitialState,
  };
  describe("initial state", () => {
    it("'selectEnhancedTimeTable' should return falsy", () => {
      expect(selectEnhancedTimeTable(initialRootState)).toEqual({ });
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
      "other-station": {
        travelDurationSeconds: 1000,
        accessDurationSeconds: 30,
      },
    };
    const samplejourneyRerAChatelet = {
      network: "rers",
      line: "a",
      departure: "chatelet+les+halles",
      destination: "auber",
      missions: "ZEBU",
    };

    const rootState: RootState = {
      journey: samplejourneyRerAChatelet,
      station: {
        userConfiguration: sampleUserConfiguration,
        stationConfigurations: sampleStationConfigurations,
      },
      toTheStation: {
        currentTime: "2020-03-10T08:13:30.000Z",
        currentTrainCode: "0824",
      },
      timeTable: {
        loading: false,
        error: null,
        data: {
          departures: sampleDepartures,
        },
      },
    };
    it("'selectEnhancedTimeTable' should MatchSnapshot", () => {
      const actualEnhancedTimeTable = selectEnhancedTimeTable(rootState);
      expect(actualEnhancedTimeTable).toBeTruthy();

      const {
        currentDeparture,
        enhancedDepartures,
        travel,
      } = actualEnhancedTimeTable;

      expect(currentDeparture).toBeTruthy();
      expect(currentDeparture?.code).toBe("0824");
      expect(currentDeparture?.index).toBe(0);

      expect(enhancedDepartures).toBeTruthy();
      const enhancedDepartures2 = enhancedDepartures!;
      expect(enhancedDepartures2.length).toBe(2);

      expect(enhancedDepartures2[0].departureIndex).toBe(0);
      expect(enhancedDepartures2[0].trainCode).toBe("0824");

      expect(enhancedDepartures2[0].departureTime.toISOString()).toBe(
        "2020-03-10T08:24:00.000Z"
      );
      expect(enhancedDepartures2[0].delayDuration.asSeconds()).toBe(-2); // 630 - 555 - 77 = -2
      expect(enhancedDepartures2[0].delayStatus).toBe("on-time");
      expect(enhancedDepartures2[0].onTimeMarginDelaySeconds).toBe(22);

      expect(travel).toBeTruthy();
      expect(travel?.accessDuration.asSeconds()).toBe(77);
      expect(travel?.nowTime.toISOString()).toBe("2020-03-10T08:13:30.000Z");
      expect(travel?.travelDuration.asSeconds()).toBe(555);

      expect(actualEnhancedTimeTable).toMatchSnapshot();
    });
    it("'selectCurrentStationConfiguration' should MatchSnapshot", () => {
      const actualCurrentStationConfiguration = selectCurrentStationConfiguration(
        rootState
      );
      expect(actualCurrentStationConfiguration).toBeTruthy();
      expect(actualCurrentStationConfiguration?.travelDurationSeconds).toBe(555);
      expect(actualCurrentStationConfiguration?.accessDurationSeconds).toBe(77);
    });
  });
});

import timeTableReducer, {
  initialState as timeTableInitialState,
  requestSuccess,
} from "../timeTable/slice";

import toTheStationReducer, {
  initialState as toTheStationInitialState,
  setUserConfiguration,
  setStationConfiguration,
  chooseTrain,
} from "../toTheStation/slice";

import { selectEnhancedTimeTable } from "./selectors";

const initialRootState = {
  timeTable: timeTableInitialState,
  toTheStation: toTheStationInitialState,
};

describe("slice timeTable", () => {
  describe("initial state", () => {
    it("'selectEnhancedTimeTable' should return falsy", () => {
      expect(selectEnhancedTimeTable(initialRootState)).toBeFalsy();
    });
  });
  describe("after initialization", () => {
    let rootStateBeforeTest;
    const userConfiguration = {
      onTimeMarginDelaySeconds: 22,
      timezone: "+04:00",
    };
    const stationConfiguration = {
      station: "chatelet+les+halles",
      travelDurationSeconds: 555,
      waitingDelaySeconds: 77,
    };
    const trainCode = "0930";

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
    const sampleDepartures = [{ trainCode: "T1" }, { trainCode: "T2" }];

    beforeEach(() => {
      const toTheStationState1 = toTheStationReducer(
        toTheStationInitialState,
        setUserConfiguration(userConfiguration)
      );

      const toTheStationState2 = toTheStationReducer(
        toTheStationState1,
        setStationConfiguration(stationConfiguration)
      );

      const toTheStationState3 = toTheStationReducer(
        toTheStationState2,
        chooseTrain(trainCode)
      );

      const timeTable1 = timeTableReducer(
        timeTableInitialState,
        requestSuccess({
          context: sampleContextRerAChatelet,
          departures: sampleDepartures,
        })
      );

      rootStateBeforeTest = {
        toTheStation: toTheStationState3,
        timeTable: timeTable1,
      };
      console.log({ rootStateBeforeTest });
    });
    it("'selectEnhancedTimeTable' should return results", () => {
      console.log({ rootStateBeforeTest });
      expect(selectEnhancedTimeTable(rootStateBeforeTest)).toBeTruthy();
    });
  });
});

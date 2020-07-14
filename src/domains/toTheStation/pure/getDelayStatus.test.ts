import moment from "moment";
import getDelayStatus from "./getDelayStatus";
import each from "jest-each";
import DelayStatus from "./delayStatus";

const testCase = (
  departureDurationStr: string,
  expectedDelayStatus: DelayStatus
) => ({
  travelDurationStr: "00:09:12",
  accessDurationStr: "00:02:00", // 48 seconds are used to run
  departureDurationStr,
  expectedDelayStatus,
});

describe("toTheStation", () => {
  describe("getDelayStatus", () => {
    each([
      ["50:00", testCase("00:50:00", DelayStatus.TooEarly)],
      ["39:00", testCase("00:39:00", DelayStatus.Early)],
      ["12:00", testCase("00:12:00", DelayStatus.Early)],
      ["11:30", testCase("00:11:43", DelayStatus.Early)],
      ["11:30", testCase("00:11:42", DelayStatus.OnTime)],
      ["11:00", testCase("00:11:00", DelayStatus.OnTime)],
      ["10:31", testCase("00:10:31", DelayStatus.OnTime)],
      ["10:29", testCase("00:10:29", DelayStatus.OnTime)],
      ["10:00", testCase("00:10:00", DelayStatus.LateWalkFast)],
      ["9:00", testCase("00:09:00", DelayStatus.LateWalkFast)],
      ["8:00", testCase("00:08:00", DelayStatus.LateWalkFast)],
      ["7:00", testCase("00:07:00", DelayStatus.LateWalkVeryFast)],
      ["6:00", testCase("00:06:00", DelayStatus.LateRun)],
      ["5:00", testCase("00:05:00", DelayStatus.LateRunFast)],
      ["4:00", testCase("00:04:00", DelayStatus.TooLate)],
      ["3:00", testCase("00:03:00", DelayStatus.TooLate)],
      ["2:00", testCase("00:02:00", DelayStatus.TooLate)],
      ["1:00", testCase("00:01:00", DelayStatus.TooLate)],
      ["0:00", testCase("00:00:00", DelayStatus.TooLate)],
    ]).test("should handle test case '%s'", (name, testCase) => {
      const {
        departureDurationStr,
        travelDurationStr,
        accessDurationStr,
        expectedDelayStatus,
      } = testCase;
      const departureDuration = moment.duration(departureDurationStr);
      const travelDuration = moment.duration(travelDurationStr);
      const accessDuration = moment.duration(accessDurationStr);

      const actualDelayStatus = getDelayStatus(
        departureDuration,
        travelDuration,
        accessDuration
      );
      expect(actualDelayStatus).toBe(expectedDelayStatus);
    });
  });
});

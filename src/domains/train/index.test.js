import moment from "moment";
import { convertToTrainCode, timeToLocal, getDelayStatus } from "./index";
import each from "jest-each";

describe("train helpers", () => {
  describe("convertToTrainCode", () => {
    each([
      ["-29:00:01", "J-1"],
      ["2020-03-10T09:19:56Z", "0919"],
      ["2020-03-10T15:20:00Z", "1520"],
      ["2020-03-10T00:00:00Z", "2400"],
      ["2020-03-10T12:00:00Z", "1200"],
      ["2020-03-10T15:00:00+01:00", "1400"],
      ["2020-25-25", "Invalid date"],
      ["XXX", "Invalid date"]
    ]).test(
      "should convert valid string '%s' into '%s'",
      (time, expectedTrainCode) => {
        const trainCode = convertToTrainCode(time);
        expect(trainCode).toBe(expectedTrainCode);
      }
    );
  });
  describe("timeToLocal", () => {
    test("should convert a valid time", () => {
      const time = new moment.utc(new Date("2020-03-10T15:19:00Z"));
      const localTime = timeToLocal(time);
      expect(localTime.isValid()).toBeTruthy();
      expect(localTime.isUTC()).toBeFalsy();
    });
    test("should not convert an invalid time", () => {
      const time = new moment.utc(new Date("2525-25-25T25:25:25Z"));
      const localTime = timeToLocal(time);
      expect(localTime.isValid()).toBeFalsy();
    });
    test("should not modify the time", () => {
      const time = new moment.utc(new Date("2020-03-10T15:19:00Z"));
      const formatBefore = time.format();
      timeToLocal(time);
      const formatAfter = time.format();
      expect(formatBefore).toBe(formatAfter);
    });
  });
  describe("getDelayStatus", () => {
    const durationPlus2m30 = moment.duration({
      minutes: 2,
      seconds: 30
    });

    test("should identify an early delay", () => {
      const onTimeMarginDelaySeconds = 20;
      const delayStatus = getDelayStatus(
        durationPlus2m30,
        onTimeMarginDelaySeconds
      );
      expect(delayStatus).toBe("early");
    });
    test("should identify an late delay", () => {
      const delayDuration = moment.duration({
        minutes: -2,
        seconds: 30
      });
      const onTimeMarginDelaySeconds = 20;
      const delayStatus = getDelayStatus(
        delayDuration,
        onTimeMarginDelaySeconds
      );
      expect(delayStatus).toBe("late");
    });
    test("should identify an ontime delay of +15s", () => {
      const delayDuration = moment.duration({
        minutes: 0,
        seconds: 15
      });
      const onTimeMarginDelaySeconds = 20;
      const delayStatus = getDelayStatus(
        delayDuration,
        onTimeMarginDelaySeconds
      );
      expect(delayStatus).toBe("ontime");
    });
    test("should identify an ontime delay of -15s", () => {
      const delayDuration = moment.duration({
        minutes: 0,
        seconds: -15
      });
      const onTimeMarginDelaySeconds = 20;
      const delayStatus = getDelayStatus(
        delayDuration,
        onTimeMarginDelaySeconds
      );
      expect(delayStatus).toBe("ontime");
    });
    test("should identify an invalid delay", () => {
      const delayDuration = "invalid delay";
      const onTimeMarginDelaySeconds = 20;
      const delayStatus = getDelayStatus(
        delayDuration,
        onTimeMarginDelaySeconds
      );
      expect(delayStatus).toBe("invalid");
    });
  });
});

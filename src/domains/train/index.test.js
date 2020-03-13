import moment from "moment";
import { convertToTrainCode, timeToLocal, getDelayStatus } from "./index";

describe("train helpers", () => {
  describe("convertToTrainCode", () => {
    test("should convert valid string", () => {
      const trainCode = convertToTrainCode("2020-03-10T09:19:56Z");
      expect(trainCode).toBe("1019");
    });
    test("should convert valid string", () => {
      const trainCode = convertToTrainCode("2020-03-10T15:00:00Z");
      expect(trainCode).toBe("1600");
    });
    test("should convert valid string GMT+1", () => {
      const trainCode = convertToTrainCode("2020-03-10T15:00:00+01:00");
      expect(trainCode).toBe("1500");
    });
    test("should not convert invalid string", () => {
      const trainCode = convertToTrainCode("XXX");
      expect(trainCode).toBe("Invalid date");
    });
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
    test("should identify an early delay", () => {
      const delayDuration = moment.duration({
        minutes: 2,
        seconds: 30
      });
      const onTimeMarginDelaySeconds = 20;
      const delayStatus = getDelayStatus(
        delayDuration,
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

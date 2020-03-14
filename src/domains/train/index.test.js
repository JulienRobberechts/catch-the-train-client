import moment from "moment";
import { convertToTrainCode, getDelayStatus } from "./index";
import each from "jest-each";

describe("train helpers", () => {
  describe("convertToTrainCode", () => {
    each([
      ["2020-03-10T09:19:56+01:00", "0919"],
      ["2020-03-10T15:20:00+01:00", "1520"],
      ["2020-03-10T00:00:00+01:00", "2400"],
      ["2020-03-10T12:00:00+01:00", "1200"],
      ["2020-03-10T15:00:00+01:00", "1500"]
    ]).test(
      "should convert valid string '%s' into '%s'",
      (timeString, expectedTrainCode) => {
        const trainCode = convertToTrainCode(timeString);
        expect(trainCode).toBe(expectedTrainCode);
      }
    );
    test("should convert invalid string into 'Invalid date'", () => {
      const originalWarn = console.warn;
      try {
        console.warn = jest.fn();
        const trainCode = convertToTrainCode("xxx");
        expect(trainCode).toBe("Invalid date");
        expect(console.warn).toHaveBeenCalled();
      } finally {
        console.warn = originalWarn;
      }
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

import moment from "moment";
import getDelayStatus from "./getDelayStatus";
import each from "jest-each";

describe("train helpers", () => {
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

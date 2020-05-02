import moment from "moment";
import getDelayStatus from "./getDelayStatus";
import each from "jest-each";
import DelayStatus from "./delayStatus";

describe("toTheStation", () => {
  describe("getDelayStatus", () => {
    each([
      ["-01:00:00", 20, DelayStatus.Late],
      ["-00:02:00", 20, DelayStatus.Late],
      ["-00:00:25", 20, DelayStatus.Late],
      ["-00:00:20", 20, DelayStatus.OnTime],
      ["-00:00:05", 20, DelayStatus.OnTime],
      ["00:00:00", 20, DelayStatus.OnTime],
      ["00:00:05", 20, DelayStatus.OnTime],
      ["00:00:20", 20, DelayStatus.OnTime],
      ["00:00:30", 20, DelayStatus.Early],
      ["00:02:00", 20, DelayStatus.Early],
      ["-00:03:00", 120, DelayStatus.Late],
      ["-00:01:30", 120, DelayStatus.OnTime],
      ["-00:00:15", 120, DelayStatus.OnTime],
      ["00:00:00", 120, DelayStatus.OnTime],
      ["00:00:20", 120, DelayStatus.OnTime],
      ["00:02:00", 120, DelayStatus.OnTime],
      ["00:03:00", 120, DelayStatus.Early],
    ]).test(
      "should consider '%s' with %s second margin as '%s'",
      (delayDurationString, onTimeMarginDelaySeconds, expectedDelayStatus) => {
        const delayDuration = moment.duration(delayDurationString);
        const actualDelayStatus = getDelayStatus(
          delayDuration,
          onTimeMarginDelaySeconds
        );
        expect(actualDelayStatus).toBe(expectedDelayStatus);
      }
    );
    test("should identify an invalid delay", () => {
      const delayDuration = moment.duration(NaN, 'minutes');
      const onTimeMarginDelaySeconds = 20;

      // @ts-ignore - to check error
      const delayStatus = getDelayStatus(
        delayDuration,
        onTimeMarginDelaySeconds
      );
      expect(delayStatus).toBe("invalid");
    });
  });
});

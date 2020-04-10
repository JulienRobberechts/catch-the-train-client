import moment from "moment";
import getDelayStatus from "./getDelayStatus";
import each from "jest-each";
import DELAY_STATUS from "./delayStatus";

describe("toTheStation", () => {
  describe("getDelayStatus", () => {
    each([
      ["-01:00:00", 20, DELAY_STATUS.LATE],
      ["-00:02:00", 20, DELAY_STATUS.LATE],
      ["-00:00:25", 20, DELAY_STATUS.LATE],
      ["-00:00:20", 20, DELAY_STATUS.ON_TIME],
      ["-00:00:05", 20, DELAY_STATUS.ON_TIME],
      ["00:00:00", 20, DELAY_STATUS.ON_TIME],
      ["00:00:05", 20, DELAY_STATUS.ON_TIME],
      ["00:00:20", 20, DELAY_STATUS.ON_TIME],
      ["00:00:30", 20, DELAY_STATUS.EARLY],
      ["00:02:00", 20, DELAY_STATUS.EARLY],
      ["-00:03:00", 120, DELAY_STATUS.LATE],
      ["-00:01:30", 120, DELAY_STATUS.ON_TIME],
      ["-00:00:15", 120, DELAY_STATUS.ON_TIME],
      ["00:00:00", 120, DELAY_STATUS.ON_TIME],
      ["00:00:20", 120, DELAY_STATUS.ON_TIME],
      ["00:02:00", 120, DELAY_STATUS.ON_TIME],
      ["00:03:00", 120, DELAY_STATUS.EARLY],
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

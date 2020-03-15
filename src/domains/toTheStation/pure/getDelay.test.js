import moment from "moment";
import getDelay from "./getDelay";
import each from "jest-each";

describe("train helpers", () => {
  describe("getDelay", () => {
    test("should identify an late delay", () => {
      const nowTime = moment.parseZone("2020-03-10T09:00:00+01:00");
      const targetTime = moment.parseZone("2020-03-10T09:11:00+01:00");
      const travelDuration = moment.duration("00:08:00");
      const waitingDuration = moment.duration("00:02:00");
      const onTimeMarginDelaySeconds = 30;

      const result = getDelay({
        nowTime,
        targetTime,
        travelDuration,
        waitingDuration,
        onTimeMarginDelaySeconds
      });

      expect(result).toEqual(expect.anything());
      // expect(result).toMatchSnapshot();
      const { targetDuration, delayDuration, delayStatus } = result;
      expect(targetDuration.asSeconds()).toEqual(60 * 11);
      expect(delayDuration.asSeconds()).toEqual(60 * 1);
      expect(delayStatus).toEqual("early");
    });
  });
});

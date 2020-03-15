import moment from "moment";
import calculateTravelData from "./calculateTravelData";
import each from "jest-each";

describe("train helpers", () => {
  describe("calculateTravelData", () => {
    test("should identify an late delay", () => {
      const nowTime = moment.parseZone("2020-03-10T09:00:00+01:00");
      const departure = { departureTime: "2020-03-10T09:11:00+01:00" };
      const travelDurationSeconds = 8 * 60;
      const waitingDelaySeconds = 120;
      const onTimeMarginDelaySeconds = 30;

      const result = calculateTravelData({
        nowTime,
        departure,
        travelDurationSeconds,
        waitingDelaySeconds,
        onTimeMarginDelaySeconds
      });

      expect(result).toEqual(expect.anything());
      expect(result).toMatchSnapshot();

      expect(result.delayDuration.asSeconds()).toEqual(60);
    });
  });
});

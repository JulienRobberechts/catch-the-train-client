import moment from "moment";
import getDelay from "./getDelay";
import each from "jest-each";

describe("train helpers", () => {
  describe("getDelay", () => {
    each([
      [
        "early 1min",
        {
          now: "2020-03-10T09:00:00+01:00",
          train: "2020-03-10T09:11:00+01:00",
          travel: "00:08:00",
          waiting: "00:02:00",
          expectedTargetDuration: 60 * 11,
          expectedDelayDuration: 60 * 1
        }
      ],
      [
        "on time 0s",
        {
          now: "2020-03-10T09:01:00+01:00",
          train: "2020-03-10T09:11:00+01:00",
          travel: "00:08:00",
          waiting: "00:02:00",
          expectedTargetDuration: 60 * 10,
          expectedDelayDuration: 60 * 0
        }
      ],
      [
        "on time -15s",
        {
          now: "2020-03-10T09:01:15+01:00",
          train: "2020-03-10T09:11:00+01:00",
          travel: "00:08:00",
          waiting: "00:02:00",
          expectedTargetDuration: 60 * 10 - 15,
          expectedDelayDuration: 60 * 0 - 15
        }
      ],
      [
        "late -1min",
        {
          now: "2020-03-10T09:02:00+01:00",
          train: "2020-03-10T09:11:00+01:00",
          travel: "00:08:00",
          waiting: "00:02:00",
          expectedTargetDuration: 60 * 9,
          expectedDelayDuration: 60 * -1
        }
      ]
    ]).test(
      "should calculate delay for %s",
      (
        _name,
        {
          now,
          train,
          travel,
          waiting,
          expectedTargetDuration,
          expectedDelayDuration
        }
      ) => {
        const nowTime = moment.parseZone(now);
        const targetTime = moment.parseZone(train);
        const travelDuration = moment.duration(travel);
        const waitingDuration = moment.duration(waiting);

        const result = getDelay({
          nowTime,
          targetTime,
          travelDuration,
          waitingDuration
        });

        expect(result).toEqual(expect.anything());
        const { targetDuration, delayDuration } = result;
        expect(targetDuration.asSeconds()).toEqual(expectedTargetDuration);
        expect(delayDuration.asSeconds()).toEqual(expectedDelayDuration);
      }
    );
  });
});

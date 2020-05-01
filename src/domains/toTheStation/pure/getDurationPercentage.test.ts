import moment from "moment";
import getDurationPercentage from "./getDurationPercentage";
import each from "jest-each";

describe("time helpers", () => {
  describe("getDurationPercentage", () => {
    each([
      ["00:02:00", "00:10:00", 20],
      ["00:10:00", "00:10:00", 100],
      ["-00:05:00", "00:10:00", -50]
    ]).test(
      "should calculate '%s' / '%s' = %s%",
      (a, b, expectedPercentage) => {
        const durationA = moment.duration(a);
        const durationB = moment.duration(b);
        const actualPercentage = getDurationPercentage(durationA, durationB);
        expect(actualPercentage).toBe(expectedPercentage);
      }
    );

    each([
      [moment.duration("00:02:00"), "10 minutes", Number.NaN],
      [null, moment.duration("00:02:00"), Number.NaN],
      [moment.duration("00:00:00"), moment.duration("00:00:00"), Number.NaN],
      [moment.duration("00:05:00"), moment.duration("00:00:00"), Infinity]
    ]).test(
      "should handle edge cases '%s' / '%s' = %s%",
      (durationA, durationB, expectedResult) => {
        const actualPercentage = getDurationPercentage(durationA, durationB);
        expect(actualPercentage).toBe(expectedResult);
      }
    );
  });
});

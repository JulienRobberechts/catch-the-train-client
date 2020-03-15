import convertToTrainCode from "./convertToTrainCode";
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
});

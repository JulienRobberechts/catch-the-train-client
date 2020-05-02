import { convertToSizeRatio } from "./getSizeRatioFor";
import each from "jest-each";

describe("timeline helpers", () => {
  describe("convertToSizeRatio", () => {
    each([
      [null, 0],
      [NaN, 0],
      [-Infinity, 0],
      [-50, 0],
      [0, 0],
      [70, 70],
      [100, 100],
      [Infinity, 100]
    ]).test("should convert %s into %s", (percentage, expectedSizeRatio) => {
      const actualSizeRatio = convertToSizeRatio(percentage);
      expect(actualSizeRatio).toEqual(expectedSizeRatio);
    });
  });
});

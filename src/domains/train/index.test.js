import { convertToTrainCode } from "./index";

describe("train helpers", () => {
  describe("convertToTrainCode", () => {
    test("should convert", () => {
      const trainCode = convertToTrainCode("2020-03-10T09:19:56Z");
      expect(trainCode).toBe("0919");
    });
  });
});

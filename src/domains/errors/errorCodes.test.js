import each from "jest-each";
import ErrorCodes from "./errorCodes";

describe("ErrorCodes", () => {
  const ErrorCodesKeyValues = Object.entries(ErrorCodes);

  each(ErrorCodesKeyValues).test(
    "entry key %s should start with ERROR_",
    (errorCodeName, errorCodeValue) => {
      expect(errorCodeName.substring(0, 6)).toBe("ERROR_");
    }
  );
  each(ErrorCodesKeyValues).test(
    "entry key %s should contains the error code %s",
    (errorCodeName, errorCodeValue) => {
      expect(errorCodeName.includes(errorCodeValue)).toBeTruthy();
    }
  );
  each(ErrorCodesKeyValues).test(
    "entry %s=%s should be between 400 and 800",
    (errorCodeName, errorCodeValue) => {
      expect(errorCodeValue).toBeGreaterThanOrEqual(400);
      expect(errorCodeValue).toBeLessThan(800);
    }
  );

  test("values should not be unique in errorCode.js", () => {
    const count = (names) =>
      names.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});
    const duplicates = (dict) => Object.keys(dict).filter((a) => dict[a] > 1);

    const allErrorCodeValues = ErrorCodesKeyValues.map(([k, v]) => v);
    const duplicatedErrorCodeValues = duplicates(count(allErrorCodeValues));

    duplicatedErrorCodeValues.forEach((errorCode) => {
      throw Error(`errorCode Value '${errorCode}' appears multiple time.`);
    });
  });
});

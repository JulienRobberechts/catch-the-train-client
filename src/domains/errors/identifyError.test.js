import each from "jest-each";
import { identifyError } from "./identifyError";
import errorCases from "./errorCaseTest";

describe("errorManagement", () => {
  describe("identifyError", () => {
    each`
      errorCaseId | errorCase
      ${1}  | ${errorCases.axiosError400}
      ${2}  | ${errorCases.axiosError500}
      ${3}  | ${errorCases.axiosError503}
      ${4}  | ${errorCases.simpleClientError700}
    `.test(
      "should identify an error case number $errorCaseId",
      ({ errorCaseId, errorCase }) => {
        const actualErrorCode = identifyError(errorCase.incomingError);
        expect(actualErrorCode).toEqual(errorCase.expectedErrorCode);
      }
    );
  });
});

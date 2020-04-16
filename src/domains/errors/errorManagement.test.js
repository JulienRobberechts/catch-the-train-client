import each from "jest-each";
import { handleError, getAppError } from "./errorManagement";
import errorCases from "./errorCaseTest";

describe("errorManagement", () => {
  // disable console logs for this test
  let originalError;
  let originalWarn;
  let originalLog;
  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
    originalWarn = console.warn;
    console.warn = jest.fn();
    originalLog = console.log;
    console.log = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
  });
  describe("handleError", () => {
    each`
      errorCaseId | errorCase                  
      ${1}        | ${errorCases.axiosError400}
      ${2}        | ${errorCases.axiosError500}
      ${3}        | ${errorCases.axiosError503}
      ${4}        | ${errorCases.simpleClientError700}
  `.test(
      "should handleError an error number $errorCaseId",
      ({ errorCaseId, errorCase }) => {
        const actualAppError = handleError(errorCase.incomingError);
        expect(actualAppError).toMatchSnapshot();
        expect(actualAppError.errorCode).toBeTruthy();
        expect(actualAppError.errorMessage).toBeTruthy();
        expect(actualAppError.errorCode).toEqual(errorCase.expectedErrorCode);
      }
    );

    test("should handleError an error REPRO", () => {
      const actualAppError = handleError(
        errorCases.simpleClientError700.incomingError
      );
      expect(actualAppError).toMatchSnapshot();
      expect(actualAppError.errorCode).toBeTruthy();
      expect(actualAppError.errorMessage).toBeTruthy();
      expect(actualAppError.errorCode).toEqual(
        errorCases.simpleClientError700.expectedErrorCode
      );
    });
  });

  describe("formatError", () => {
    each`
      errorCode   | expectedMessage
      ${503}      | ${"Le service est indisponible pour le moment"}
      ${700}      | ${"Erreur dans l'application (client web)"}
    `.test(
      "should format an error $errorCode",
      ({ errorCode, expectedMessage }) => {
        const actualObject = getAppError(errorCode);
        expect(actualObject.msg).toEqual(expectedMessage);
      }
    );
  });
});

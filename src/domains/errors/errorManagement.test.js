import each from "jest-each";
import ErrorCodes from "./errorCodes";
import ErrorLevels from "./errorLevels";
import {
  handleError,
  identifyError,
  formatError,
  attachErrorContext,
} from "./errorManagement";

const axiosError400 = {
  message: "Request failed with status code 400",
  isAxiosError: true,
  response: { status: 400 },
};

const axiosError500 = {
  message: "Request failed with status code 500",
  isAxiosError: true,
  response: { status: 500 },
};

const axiosError503 = {
  message: "Request failed with status code 503",
  isAxiosError: true,
  response: { status: 503 },
};

const axiosError503_Object = {
  code: ErrorCodes.ERROR_503_SERVER_NOT_AVAILABLE,
  msg: "Le service est indisponible pour le moment",
  level: ErrorLevels.LOW,
};

const simpleClientError700 = {
  message: "simple client error",
};

const simpleClientError700_Object = {
  code: ErrorCodes.ERROR_700_CLIENT_ERROR,
  msg: "Erreur dans l'application (client web)",
};

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
      rawError                  | expectedErrorObject
      ${axiosError503}          | ${axiosError503_Object}
      ${simpleClientError700}   | ${simpleClientError700_Object}
    `.test(
      "%#. should handleError an error",
      ({ rawError, expectedErrorObject }) => {
        const actualErrorObject = handleError(rawError);
        expect(actualErrorObject).toEqual(expectedErrorObject);
      }
    );
  });
  describe("identifyError", () => {
    each`
      error                     | expectedCode
      ${axiosError400}          | ${400}
      ${axiosError500}          | ${500}
      ${axiosError503}          | ${503}
      ${simpleClientError700}   | ${700}
    `.test(
      "should identify an error $expectedCode",
      ({ error, expectedCode }) => {
        const actualCode = identifyError(error);
        expect(actualCode).toEqual(expectedCode);
      }
    );
  });
  describe("formatError", () => {
    each`
      errorCode   | expectedMessage
      ${503}      | ${"Le service est indisponible pour le moment"}
      ${700}      | ${"Erreur dans l'application (client web)"}
    `.test(
      "should format an error $errorCode",
      ({ errorCode, expectedMessage }) => {
        const actualObject = formatError(errorCode);
        expect(actualObject.msg).toEqual(expectedMessage);
      }
    );
  });
  describe("attachErrorContext", () => {
    test("should attach a context to the error", () => {
      const error = {
        message: "simple error",
      };
      const context = "In module X";
      const errorWithContext = attachErrorContext(error, context);
      expect(errorWithContext.context).toEqual(context);
    });
  });
});

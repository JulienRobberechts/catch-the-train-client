import each from "jest-each";
import ErrorCodes from "./errorCodes";
import { ErrorMessages as errorMessagesFr } from "./errorMessages.fr";
import { getAppError } from "./errorManagement";

describe("errorManagement", () => {
  describe("errorMessagesFr", () => {
    each(
      Object.entries(ErrorCodes).map(([errorCodeName, errorCodeValue]) => [
        errorCodeValue,
      ])
    ).test(
      "should have an entry for errorCode %o (in ErrorCodes.js)",
      (errorCode) => {
        const appError = getAppError(errorCode);
        // console.log({ appError });
        expect(appError).toBeTruthy();
        expect(appError.code).toBe(errorCode);
        expect(appError.msg).toBeTruthy();
      }
    );
    each(errorMessagesFr.map((m) => [m])).test(
      "entry %o should match an errorCode in ErrorCodes.js",
      (errorMessage) => {
        const codeInErrorCodeFile = Object.entries(ErrorCodes).find(
          ([key, value]) => value === errorMessage.code
        );
        expect(codeInErrorCodeFile).toBeTruthy();
      }
    );
  });
  describe("getAppError", () => {
    each`
      errorCode   | expectedMessage
      ${400}      | ${"Erreur dans les donnees envoyés au serveur."}
      ${500}      | ${"Une erreur inconnue s'est produite sur le serveur"}
      ${503}      | ${"Le service est indisponible pour le moment"}
    `.test(
      "should get the message for an error $errorCode",
      ({ errorCode, expectedMessage }) => {
        const actualObject = getAppError(errorCode);
        expect(actualObject).toBeTruthy();
        expect(actualObject.msg).toEqual(expectedMessage);
      }
    );
  });
});

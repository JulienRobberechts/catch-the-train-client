import each from "jest-each";
import { getUiError } from "./uiErrorMapping";

const errorCases = {
  notAvailable: {
    incomingError: { errorCode: 503 },
    expectedUiError: {
      message1: "L'application n'est pas disponible pour l'instant.",
      message2: "Merci de retenter plus tard.",
      icon: "UnavailableErrorIcon",
      colorKey: "original",
    },
  },
  notConnection: {
    incomingError: { errorCode: 533 },
    expectedUiError: {
      message1: "Problème de connexion",
      message2: "merci de verifiez votre connexion internet.",
      icon: "NoConnectionErrorIcon",
      colorKey: "warning",
    },
  },
  notDeparture: {
    incomingError: { errorCode: 1001, errorMessage: "no departure" },
    expectedUiError: {
      message1: "no departure",
      message2: "",
      icon: "NoDepartureErrorIcon",
      colorKey: "highlight",
    },
  },
};
describe("errorManagement", () => {
  describe("identifyError", () => {
    each`
      errorCaseId | errorCase
      ${1}  | ${errorCases.notAvailable}
      ${2}  | ${errorCases.notConnection}
      ${3}  | ${errorCases.notDeparture}
    `.test(
      "should an error to UI error (case number $errorCaseId)",
      ({ errorCaseId, errorCase }) => {
        const actualUiError = getUiError(errorCase.incomingError);
        expect(actualUiError).toEqual(errorCase.expectedUiError);
      }
    );
  });
});

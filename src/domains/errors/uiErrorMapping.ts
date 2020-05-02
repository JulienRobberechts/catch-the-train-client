import ErrorCodes from "../../domains/errors/errorCodes";
import { GuiError, AError } from "./types";

const getUiError = (error: AError): GuiError => {
  const { errorCode, errorMessage } = error;

  switch (errorCode) {
    case ErrorCodes.ERROR_503_SERVER_NOT_AVAILABLE:
      return {
        message1: "L'application n'est pas disponible pour l'instant.",
        message2: "Merci de retenter plus tard.",
        icon: "UnavailableErrorIcon",
        colorKey: "original",
      };
    case ErrorCodes.ERROR_533_SERVER_NOT_REACHABLE:
      return {
        message1: "Problème de connexion",
        message2: "merci de verifiez votre connexion internet.",
        icon: "NoConnectionErrorIcon",
        colorKey: "warning",
      };
    case ErrorCodes.ERROR_1001_TIMETABLE_NO_DEPARTURE:
      return {
        message1: errorMessage,
        message2: "",
        icon: "NoDepartureErrorIcon",
        colorKey: "highlight",
      };
    default:
      return {
        message1: "Oups! Nous vivons une expérience paranormale",
        message2: "Nous travaillons à rétablir l'ordre dans l'univers",
        icon: "UnknownErrorIcon",
        colorKey: "warning",
      };
  }
};

export { getUiError };

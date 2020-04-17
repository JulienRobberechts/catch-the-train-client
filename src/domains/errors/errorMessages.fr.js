import ErrorCodes from "./errorCodes";
import ErrorLevels from "./errorLevels";

const errorInErrorManagementObject = {
  code: ErrorCodes.ERROR_701_ERROR_MANAGEMENT_ERROR,
  msg: "La gestion d'erreur n'a pas fonctionnée",
  level: ErrorLevels.HIGH,
};

const ErrorMessages = [
  {
    code: ErrorCodes.ERROR_400_SERVER_BAD_REQUEST,
    msg: "Erreur dans les donnees envoyés au serveur.",
  },
  {
    code: ErrorCodes.ERROR_499_OTHER_CLIENT_ERRORS,
    msg: "Erreur cliente renvoyée par le serveur",
    level: ErrorLevels.HIGH,
  },
  {
    code: ErrorCodes.ERROR_500_SERVER_ERROR,
    msg: "Une erreur inconnue s'est produite sur le serveur",
    level: ErrorLevels.LOW,
  },
  {
    code: ErrorCodes.ERROR_503_SERVER_NOT_AVAILABLE,
    msg: "Le service est indisponible pour le moment",
    level: ErrorLevels.LOW,
  },
  {
    code: ErrorCodes.ERROR_533_SERVER_NOT_REACHABLE,
    msg: "Le service est injoignable pour le moment",
    level: ErrorLevels.LOW,
  },
  {
    code: ErrorCodes.ERROR_599_OTHER_SERVER_ERROR,
    msg: "Erreur du serveur",
    level: ErrorLevels.HIGH,
  },
  {
    code: ErrorCodes.ERROR_600_UNKNOWN_ERROR,
    msg: "Une erreur inconnue s'est produite",
    level: ErrorLevels.HIGH,
  },
  {
    code: ErrorCodes.ERROR_700_CLIENT_ERROR,
    msg: "Erreur dans l'application (client web)",
    level: ErrorLevels.HIGH,
  },
  {
    code: ErrorCodes.ERROR_701_ERROR_MANAGEMENT_ERROR,
    msg: "La gestion d'erreur n'a pas fonctionnée",
    level: ErrorLevels.HIGH,
  },
  {
    code: ErrorCodes.ERROR_1001_TIMETABLE_NO_DEPARTURE,
    msg: "Il n'y a pas de train au départ pour l'instant",
    level: ErrorLevels.LOW,
  },
];

export { ErrorMessages, errorInErrorManagementObject };

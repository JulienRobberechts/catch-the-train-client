import ErrorCodes from "./errorCodes";
import ErrorLevels from "./errorLevels";

const errorInErrorManagementObject = {
  code: ErrorCodes.ERROR_601_ERROR_MANAGEMENT,
  msg: "La gestion d'erreur n'a pas fonctionnée",
  level: ErrorLevels.HIGH,
};

const ErrorMessages = [
  {
    code: ErrorCodes.ERROR_400_SERVER_BAD_REQUEST,
    msg: "Erreur dans les donnees envoyés au serveur.",
  },
  {
    code: ErrorCodes.ERROR_500_SERVER_ERROR,
    msg: "Une erreur inconnue s'est produite sur le serveur",
  },
  {
    code: ErrorCodes.ERROR_503_SERVER_NOT_AVAILABLE,
    msg: "Le service est indisponible pour le moment",
    level: ErrorLevels.LOW,
  },
  {
    code: ErrorCodes.ERROR_600_UNKNOWN_ERROR,
    msg: "Une erreur inconnue s'est produite",
    level: ErrorLevels.HIGH,
  },
  {
    code: ErrorCodes.ERROR_700_CLIENT_ERROR,
    msg: "Erreur dans l'application (client web)",
  },
  {
    code: ErrorCodes.ERROR_701_ERROR_MANAGEMENT,
    msg: "La gestion d'erreur n'a pas fonctionnée",
    level: ErrorLevels.HIGH,
  },
];

export { ErrorMessages as default, errorInErrorManagementObject };

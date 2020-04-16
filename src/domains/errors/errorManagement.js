import {
  ErrorMessages,
  errorInErrorManagementObject,
} from "./errorMessages.fr";
import ErrorLevels from "./errorLevels";
import { identifyError } from "./identifyError";

const handleError = (incomingError) => {
  try {
    const errorCode = identifyError(incomingError);
    const appError = getAppError(errorCode);
    LogErrorInternally(incomingError, appError);
    LogErrorForUser(appError);
    return toPublicError(appError);
  } catch (errorInErrorManagement) {
    console.log("Error in the error treatment", { errorInErrorManagement });
    return errorInErrorManagementObject;
  }
};

const toPublicError = (appError) => {
  const { code: errorCode, msg: errorMessage } = appError;

  const originalException =
    process.env.NODE_ENV !== "production"
      ? appError.originalException
      : undefined;

  return {
    errorType: "Error",
    errorCode,
    errorMessage,
    originalException,
  };
};

const getAppError = (errorCode) => {
  return ErrorMessages.find((e) => e.code === errorCode);
};

const LogErrorInternally = (errorInDev, errorObjectWithContext) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.error({ errorInDev });
    console.error({ errorObjectWithContext });
  }

  // log via the server
  // todo ...
};

const LogErrorForUser = (errorObject) => {
  if (!errorObject) {
    console.error("Error management received an empty error");
    return;
  }

  const { code, level = ErrorLevels.MEDIUM, msg } = errorObject;
  const fullErrorMessage = `ERROR '${code}' (${level}) : '${msg}'`;

  // log on the client
  switch (errorObject.level) {
    case ErrorLevels.LOW:
      console.log(fullErrorMessage);
      break;
    case ErrorLevels.MEDIUM:
      console.warn(fullErrorMessage);
      break;
    case ErrorLevels.HIGH:
      console.error(fullErrorMessage);
      break;
    default:
      console.warn(fullErrorMessage);
      break;
  }
};

export { handleError, getAppError, LogErrorInternally, LogErrorForUser };

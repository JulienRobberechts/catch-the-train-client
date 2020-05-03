import {
  ErrorMessages,
  errorInErrorManagementObject,
} from "./errorMessages.fr";
import ErrorLevels from "./errorLevels";
import { identifyError } from "./identifyError";
import { AppError, PublicError, AnyIncomingError } from "./types";

const handleError = (incomingError: AnyIncomingError): PublicError => {
  try {
    const errorCode = identifyError(incomingError);
    const appError = getAppError(errorCode);
    LogErrorInternally(incomingError, appError);
    LogErrorForUser(appError);
    return toPublicError(appError);
  } catch (errorInErrorManagement) {
    console.log("Error in the error treatment", { errorInErrorManagement });
    return toPublicError(errorInErrorManagementObject);
  }
};

const toPublicError = (appError: AppError): PublicError => {
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

const getAppError = (errorCode: number) : AppError => {
  const appError = ErrorMessages.find((e) => e.code === errorCode);
  return appError ?? errorInErrorManagementObject;
};

const LogErrorInternally = (incomingError: AnyIncomingError, errorObjectWithContext: any) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.error({ incomingError });
    console.error({ errorObjectWithContext });
  }

  // log via the server
  // todo ...
};

const LogErrorForUser = (errorObject: AppError) => {
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

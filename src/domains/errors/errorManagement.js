import ErrorCodes from "./errorCodes";
import ErrorMessages, {
  errorInErrorManagementObject,
} from "./errorMessages.fr";
import ErrorLevels from "./errorLevels";

const handleError = (rawError) => {
  try {
    const errorCode = identifyError(rawError);
    const errorObject = formatError(errorCode);
    const context = undefined; // todo...
    const errorObjectWithContext = attachErrorContext(errorObject, context);
    LogErrorInternally(rawError, errorObjectWithContext);
    LogErrorForUser(errorObjectWithContext);
    return errorObjectWithContext;
  } catch (errorInErrorManagement) {
    console.log("Error in the error treatment", { errorInErrorManagement });
    return errorInErrorManagementObject;
  }
};

const identifyError = (rawError) => {
  const httpStatus = rawError?.response?.status;
  if (httpStatus === 500) return ErrorCodes.ERROR_500_SERVER_ERROR;
  if (httpStatus === 503) return ErrorCodes.ERROR_503_SERVER_NOT_AVAILABLE;
  if (httpStatus === 400) return ErrorCodes.ERROR_400_SERVER_BAD_REQUEST;
  if (!httpStatus) return ErrorCodes.ERROR_700_CLIENT_ERROR;
  return ErrorCodes.ERROR_600_UNKNOWN_ERROR;
};

const formatError = (errorCode) => {
  return ErrorMessages.find((e) => e.code === errorCode);
};

const attachErrorContext = (errorObject, context) => {
  errorObject.context = context;
  return errorObject;
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

export {
  handleError,
  identifyError,
  formatError,
  attachErrorContext,
  LogErrorInternally,
  LogErrorForUser,
};

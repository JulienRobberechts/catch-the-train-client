import ErrorCodes from "./errorCodes";
import ClientError from "./clientError";
import { AnyIncomingError } from "./types";

const identifyError = (incomingError: AnyIncomingError): number => {
  if (!incomingError) {
    throw Error("The incoming Error is falsy");
  }
  if (incomingError instanceof ClientError) {
    return identifyClientError(incomingError);
  }

  if (incomingError.isAxiosError) {
    return identifyServerError(incomingError);
  }

  return identifyClientError(incomingError);
};

const identifyServerError = (incomingError: AnyIncomingError): number => {
  const response = incomingError?.response;
  if (!response) {
    return ErrorCodes.ERROR_533_SERVER_NOT_REACHABLE;
  }
  const httpStatus = response?.status;
  return identifyServerErrorByHttpStatus(httpStatus);
};

const identifyServerErrorByHttpStatus = (status: number): number => {
  switch (status) {
    case 400:
      return ErrorCodes.ERROR_400_SERVER_BAD_REQUEST;
    case 500:
      return ErrorCodes.ERROR_500_SERVER_ERROR;
    case 503:
      return ErrorCodes.ERROR_503_SERVER_NOT_AVAILABLE;
    default:
      if (status >= 400 && status < 500) {
        return ErrorCodes.ERROR_499_OTHER_CLIENT_ERRORS;
      }
      if (status >= 500 && status < 600) {
        return ErrorCodes.ERROR_599_OTHER_SERVER_ERROR;
      }
  }
  return ErrorCodes.ERROR_599_OTHER_SERVER_ERROR;
};

const identifyClientError = (incomingError: AnyIncomingError): number => {
  if (incomingError instanceof ClientError) {
    if (!incomingError?.errorCode) {
      throw Error("Each ClientError should have an errorCode");
    }
    return incomingError.errorCode;
  }

  return ErrorCodes.ERROR_700_CLIENT_ERROR;
};

export { identifyError };

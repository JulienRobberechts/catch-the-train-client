import ErrorCodes from "./errorCodes";

const identifyError = (incomingError) => {
  return incomingError.isAxiosError
    ? identifyServerError(incomingError)
    : identifyClientError(incomingError);
};

const identifyServerError = (incomingError) => {
  const response = incomingError?.response;
  if (!response) {
    return ErrorCodes.ERROR_533_SERVER_NOT_REACHABLE;
  }
  const httpStatus = response?.status;
  return identifyServerErrorByHttpStatus(httpStatus);
};

const identifyServerErrorByHttpStatus = (status) => {
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
};

const identifyClientError = (incomingError) => {
  return ErrorCodes.ERROR_700_CLIENT_ERROR;
};

export { identifyError };
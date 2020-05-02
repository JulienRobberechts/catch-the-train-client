import ErrorCodes from "./errorCodes";

const errorCases = {
  axiosError400: {
    incomingError: {
      message: "Request failed with status code 400",
      isAxiosError: true,
      response: { status: 400 },
    },
    expectedErrorCode: ErrorCodes.ERROR_400_SERVER_BAD_REQUEST,
  },
  axiosError401: {
    incomingError: {
      message: "Request failed with status code 401",
      isAxiosError: true,
      response: { status: 401 },
    },
    expectedErrorCode: ErrorCodes.ERROR_499_OTHER_CLIENT_ERRORS,
  },
  axiosError500: {
    incomingError: {
      message: "Request failed with status code 500",
      isAxiosError: true,
      response: { status: 500 },
    },
    expectedErrorCode: ErrorCodes.ERROR_500_SERVER_ERROR,
  },

  axiosError503: {
    incomingError: {
      message: "Request failed with status code 503",
      isAxiosError: true,
      response: { status: 503 },
    },
    expectedErrorCode: ErrorCodes.ERROR_503_SERVER_NOT_AVAILABLE,
  },

  axiosError504: {
    incomingError: {
      message: "Request failed with status code 504",
      isAxiosError: true,
      response: { status: 504 },
    },
    expectedErrorCode: ErrorCodes.ERROR_599_OTHER_SERVER_ERROR,
  },

  simpleClientError700: {
    incomingError: Error("simple client error"),
    expectedErrorCode: ErrorCodes.ERROR_700_CLIENT_ERROR,
  },
};

 export default errorCases;

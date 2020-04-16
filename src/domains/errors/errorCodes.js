const ErrorCodes = {
  // 400: Client errors returned by the server
  ERROR_400_SERVER_BAD_REQUEST: 400,
  ERROR_499_OTHER_CLIENT_ERRORS: 499,

  // 500: Server errors
  ERROR_500_SERVER_ERROR: 500,
  // The server respond with a 503 error
  ERROR_503_SERVER_NOT_AVAILABLE: 503,
  // No response received from the server = 'Network error'
  ERROR_533_SERVER_NOT_REACHABLE: 533,
  ERROR_599_OTHER_SERVER_ERROR: 599,

  // 600: Server or client errors
  ERROR_600_UNKNOWN_ERROR: 600,

  // 700: Client errors
  ERROR_700_CLIENT_ERROR: 700,
  ERROR_701_ERROR_MANAGEMENT_ERROR: 701,
};

export default ErrorCodes;

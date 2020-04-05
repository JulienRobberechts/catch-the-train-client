const ErrorCodes = {
  // 400: Client errors returned by the server
  ERROR_400_SERVER_BAD_REQUEST: 400,

  // 500: Server errors
  ERROR_500_SERVER_ERROR: 500,
  ERROR_503_SERVER_NOT_AVAILABLE: 503,

  // 600: Server or client errors
  ERROR_600_UNKNOWN_ERROR: 600,

  // 700: Client errors
  ERROR_700_CLIENT_ERROR: 700,
  ERROR_701_ERROR_MANAGEMENT_ERROR: 701,
};

export default ErrorCodes;

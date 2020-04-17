class ClientError extends Error {
  constructor(errorCode, rootError) {
    super("ClientError");
    this.name = "ClientError";
    this.errorCode = errorCode;
    this.rootError = rootError;
  }
}

export default ClientError;

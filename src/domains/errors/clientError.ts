class ClientError extends Error {
  errorCode : number;
  rootError = Error;
  constructor(errorCode: number, rootError: Error) {
    super("ClientError");
    this.name = "ClientError";
    this.errorCode = errorCode;
    this.rootError = rootError;
  }
}

export default ClientError;

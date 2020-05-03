class ClientError extends Error {
  errorCode : number;
  constructor(errorCode: number) {
    super("ClientError");
    this.name = "ClientError";
    this.errorCode = errorCode;
  }
}

export default ClientError;

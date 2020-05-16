class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    // statusCode(in this.statusCode) here is just a property while the second statusCode is coming from the constructor above
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;

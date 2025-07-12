class errorHandler extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    success = false,
    stack = ""
  ) {
    super(message);
    this.message = message;
    this.success = success;
    this.statusCode = statusCode;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

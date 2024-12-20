const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customError");

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

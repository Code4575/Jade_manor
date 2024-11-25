const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customError");

class ForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;

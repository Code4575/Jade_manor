const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const errorHandlerMiddleware = (error, request, response, next) => {
  console.log(error);
  console.log(error.name);
  let customError = {
    statusCode: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
    errorMessage: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  };

  if (error.name === "CastError") {
    customError.statusCode = 404;
    customError.errorMessage = `No item found with id ${error.value}`;
  }

  return response
    .status(customError.statusCode)
    .json({ message: customError.errorMessage });
};

module.exports = errorHandlerMiddleware;

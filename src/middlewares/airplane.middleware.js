const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");

const validateCreateRequest = (req, res, next) => {
  if (!req.body.modelNumber) {
    // return res.status(StatusCodes.BAD_REQUEST).json({
    //   succecss: false,
    //   message: "ModelNumber is required",
    // });
    ErrorResponse.error = new AppError(
      ["Something went wrong: ModelNumber is required"],
      StatusCodes.BAD_REQUEST
    );
    ErrorResponse.message = "Something went wrong: ModelNumber is required";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

module.exports = { validateCreateRequest };

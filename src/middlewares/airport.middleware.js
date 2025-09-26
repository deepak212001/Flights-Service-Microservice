const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");

const validateCreateRequest = (req, res, next) => {
    if (!req.body.name || !req.body.code || !req.body.cityId) {

        ErrorResponse.error = new AppError(
            ["Something went wrong: All Field are required"],
            StatusCodes.BAD_REQUEST
        );
        ErrorResponse.message = "Something went wrong: All Field are required";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
};

module.exports = { validateCreateRequest };

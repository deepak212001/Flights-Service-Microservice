const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
// const AppError = require("../utils/errors/app.error");
const AppError = require("../utils/errors/app.error");
const airplaneRepository = new AirplaneRepository(); // make a object

const createAirplane = async (data) => {
  try {
    console.log("data", data);
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    // console.log("ValidationError", error.name, error);
    //   errors: [
    //   ValidationErrorItem {
    //     message: 'Validation max on capacity failed',
    //     type: 'Validation error',
    //     path: 'capacity',
    //     value: '1520',
    //     origin: 'FUNCTION',
    //     instance: [Airplane],
    //     validatorKey: 'max',
    //     validatorName: 'max',
    //     validatorArgs: [Array],
    //     original: [Error]
    //   }
    // ]

    if (error.name === "SequelizeValidationError") {
      let explation = [];
      // console.log("error.errors", error.errors);
      error.errors.forEach((err) => {
        // console.log("ValidationErrorItem", err);
        explation.push(err.message);
      });
      // console.log("explation", explation);
      throw new AppError(explation, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(
      "Cannot create a new Airplane Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplanes = async () => {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplane = async (id) => {
  try {
    // console.log("id")
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you request is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destoryAirplane = async (id) => {
  try {
    console.log("id", id)
    const airplane = await airplaneRepository.destroy(id);
    console.log("airplane", airplane)
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you request is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot delete data of airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirplane = async (id, data) => {
  try {
    const updateAirplane = await airplaneRepository.update(id, data);
    return updateAirplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you request is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Update data of airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destoryAirplane,
  updateAirplane,
};

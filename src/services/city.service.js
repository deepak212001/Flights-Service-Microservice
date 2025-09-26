const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
// const AppError = require("../utils/errors/app.error");
const AppError = require("../utils/errors/app.error");
const cityRepository = new CityRepository(); // make a object

const createCity = async (data) => {
  try {
    console.log("data", data);
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    // console.log(error);

    if (
      error.name === "SequelizeValidationError" ||
      "SequelizeUniqueConstraintError"
    ) {
      let explation = [];
      // console.log("error.errors", error.errors);
      error.errors.forEach((err) => {
        // console.log("ValidationErrorItem", err);
        explation.push(err.value + " " + err.message);
      });
      // console.log("explation", explation);
      throw new AppError(explation, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(
      "Cannot create a new City Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};



const getCities = async () => {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getCity = async (id) => {
  try {
    // console.log("id")
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you request is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destoryCity = async (id) => {
  try {
    // console.log("id")
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you request is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot delete data of city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateCity = async (id, data) => {
  try {
    const updateCity = await cityRepository.update(id, data);
    return updateCity;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you request is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Update data of city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createCity,
  getCities,
  getCity,
  destoryCity,
  updateCity,
};

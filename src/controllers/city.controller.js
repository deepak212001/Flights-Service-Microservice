const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createCity = async (req, res) => {
  try {
    // console.log(req.body);
    const { name } = req.body;
    // console.log("name", name);
    if (!name) {
      console.log("name nhi hai ");
      ErrorResponse.message = "City name is required";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const city = await CityService.createCity({
      name,
    });
    SuccessResponse.data = city;
    SuccessResponse.message = "Successfully Create an City";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating City";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};


const getCities = async (req, res) => {
  try {
    const cities = await CityService.getCities();
    SuccessResponse.data = cities;
    SuccessResponse.message = "Successfully Fetch the data of all city";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching the data of all city";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getCity = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      ErrorResponse.message =
        "Id is must for fetch the data of specific city ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const city = await CityService.getCity(id);
    SuccessResponse.data = city;
    SuccessResponse.message = "Successfully fetch the data of an city";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching the data of city";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};


const destoryCity = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      ErrorResponse.message =
        "Id is must for delete the data of specific city ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const city = await CityService.destoryCity(id);
    SuccessResponse.data = city;
    SuccessResponse.message = "Successfully delete the data of an city";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while Deleting the data of city";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

//UPATE
const updateCity = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      ErrorResponse.message =
        "Id is must for Update the data of specific city ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const { name } = req.body;
    if (!name) {
      ErrorResponse.message =
        "Data is must for Update the data of specific city ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const city = await CityService.updateCity(id, { name });
    SuccessResponse.data = city;
    SuccessResponse.message = "Successfully Update the data of an city";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while Updating the data of city";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};


module.exports = {
  createCity,
  getCities,
  getCity,
  destoryCity,
  updateCity,
};

// import { StatusCodes } from "http-status-codes";
// import { AirplaneServices } from "../services/index.js";
const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { AirplaneRepository } = require("../repositories");
const { col } = require("sequelize");

const createAirplane = async (req, res) => {
  try {
    console.log(req.body);
    // const { modelNumber, capacity } = req.body;
    // if (!modelNumber) {
    //   return res.status(StatusCodes.BAD_REQUEST ).json({
    //     succecss: false,
    //     message: "ModelNumber is required",
    //   });
    // }
    // middleware me hi kar liya hai
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    // console.log("airplane", airplane);

    // return res.status(StatusCodes.CREATED).json({
    //   succecss: true,
    //   message: "Successfully Create an Airplane",
    //   data: airplane,
    // });
    SuccessResponse.data = airplane;
    SuccessResponse.message = "Successfully Create an Airplane";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    // console.log("error", error);
    // ab ye error airplane.service se aa rha hai and vaha pe statuscode diya ahi to ab error.StatusCode
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAirplanes = async (req, res) => {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
    SuccessResponse.message = "Successfully Fetch the data of all Airplane";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching the data of all airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAirplane = async (req, res) => {
  try {
    // /airplane/:id
    const id = req.params.id;
    if (!id) {
      ErrorResponse.message =
        "Id is must for fetch the data of specific airplane ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const airplanes = await AirplaneService.getAirplane(id);
    SuccessResponse.data = airplanes;
    SuccessResponse.message = "Successfully fetch the data of an Airplane";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching the data of airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

//DELETE : /api/v1/airplanes/:id
const destoryAirplane = async (req, res) => {
  try {
    // /airplane/:id
    const id = req.params.id;
    console.log("id in c", id)
    if (!id) {
      ErrorResponse.message =
        "Id is must for delete the data of specific airplane ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const airplane = await AirplaneService.destoryAirplane(id);
    console.log("airplane in co", airplane)
    SuccessResponse.data = airplane;
    SuccessResponse.message = "Successfully delete the data of an Airplane";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while Deleting the data of airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

//UPATE
const updateAirplane = async (req, res) => {
  try {
    // /airplane/:id
    const id = req.params.id;
    if (!id) {
      ErrorResponse.message =
        "Id is must for Update the data of specific airplane ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body) {
      ErrorResponse.message =
        "Data is must for Update the data of specific airplane ";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const airplane = await AirplaneService.updateAirplane(id, req.body);
    SuccessResponse.data = airplane;
    SuccessResponse.message = "Successfully Update the data of an Airplane";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while Updating the data of airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destoryAirplane,
  updateAirplane,
};


const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createAirport = async (req, res) => {
    try {
        // console.log(req.body);
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        SuccessResponse.data = airport;
        SuccessResponse.message = "Successfully Create an Airport";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

const getAirports = async (req, res) => {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        SuccessResponse.message = "Successfully Fetch the data of all Airport";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while fetching the data of all airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

const getAirport = async (req, res) => {
    try {
        // /airport/:id
        const id = req.params.id;
        if (!id) {
            ErrorResponse.message =
                "Id is must for fetch the data of specific airport ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const airports = await AirportService.getAirport(id);
        SuccessResponse.data = airports;
        SuccessResponse.message = "Successfully fetch the data of an Airport";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while fetching the data of airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

//DELETE : /api/v1/airports/:id
const destoryAirport = async (req, res) => {
    try {
        // /airport/:id
        const id = req.params.id;
        if (!id) {
            ErrorResponse.message =
                "Id is must for delete the data of specific airport ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const airport = await AirportService.destoryAirport(id);
        SuccessResponse.data = airport;
        SuccessResponse.message = "Successfully delete the data of an Airport";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while Deleting the data of airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

//UPATE
const updateAirport = async (req, res) => {
    try {
        // /airport/:id
        const id = req.params.id;
        if (!id) {
            ErrorResponse.message =
                "Id is must for Update the data of specific airport ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        if (!req.body) {
            ErrorResponse.message =
                "Data is must for Update the data of specific airport ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const airport = await AirportService.updateAirport(id, req.body);
        SuccessResponse.data = airport;
        SuccessResponse.message = "Successfully Update the data of an Airport";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while Updating the data of airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destoryAirport,
    updateAirport,
};

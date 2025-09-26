
const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createFlight = async (req, res) => {
    try {
        // console.log(req.body);
        const Flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });
        SuccessResponse.data = Flight;
        SuccessResponse.message = "Successfully Create an Flight";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log("error", error)
        ErrorResponse.message = "Something went wrong while creating Flight";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

const getFlights = async (req, res) => {
    try {
        const Flights = await FlightService.getFlights();
        SuccessResponse.data = Flights;
        SuccessResponse.message = "Successfully Fetch the data of all Flight";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while fetching the data of all Flight";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

const getFlight = async (req, res) => {
    try {
        // /airport/:id
        const id = req.params.id;
        if (!id) {
            ErrorResponse.message =
                "Id is must for fetch the data of specific Flight ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const Flights = await FlightService.getFlight(id);
        SuccessResponse.data = Flights;
        SuccessResponse.message = "Successfully fetch the data of an Flight";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while fetching the data of Flight";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

//DELETE : /api/v1/airports/:id
const destoryFlight = async (req, res) => {
    try {
        // /airport/:id
        const id = req.params.id;
        if (!id) {
            ErrorResponse.message =
                "Id is must for delete the data of specific Flight ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const Flight = await FlightService.destoryFlight(id);
        SuccessResponse.data = Flight;
        SuccessResponse.message = "Successfully delete the data of an Flight";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while Deleting the data of Flight";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

//UPATE
const updateFlight = async (req, res) => {
    try {
        // /airport/:id
        const id = req.params.id;
        if (!id) {
            ErrorResponse.message =
                "Id is must for Update the data of specific Flight ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        if (!req.body) {
            ErrorResponse.message =
                "Data is must for Update the data of specific Flight ";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const Flight = await FlightService.updateFlight(id, req.body);
        SuccessResponse.data = Flight;
        SuccessResponse.message = "Successfully Update the data of an Flight";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message =
            "Something went wrong while Updating the data of Flight";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};


const getAllFlightsByFilters = async (req, res) => {
    try {
        console.log("req.query", req.query)
        const flights = await FlightService.getAllFlightsByFilters(req.query);
        SuccessResponse.data = flights;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        console.log("error", error)
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getFlights,
    getFlight,
    destoryFlight,
    updateFlight,
    getAllFlightsByFilters
};

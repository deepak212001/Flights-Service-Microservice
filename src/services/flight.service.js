const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
// const AppError = require("../utils/errors/app.error");
const AppError = require("../utils/errors/app.error");
const flightRepository = new FlightRepository(); // make a object
const { Op } = require('sequelize')

const createFlight = async (data) => {
    try {
        console.log("data", data);
        const flight = await flightRepository.create(data);
        console.log("flight", flight)
        return flight;
    } catch (error) {
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
            "Cannot create a new Flight Object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const getFlights = async () => {
    try {
        const flights = await flightRepository.getAll();
        return flights;
    } catch (error) {
        throw new AppError(
            "Cannot fetch data of all Flights",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const getFlight = async (id) => {
    try {
        // console.log("id")
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The Flight you request is not presentdffdds",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot fetch data of Flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const destoryFlight = async (id) => {
    try {
        // console.log("id")
        const flight = await flightRepository.destroy(id);
        return flight;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The Flight you request is not present",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot delete data of Flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const updateFlight = async (id, data) => {
    try {
        const updateflight = await flightRepository.update(id, data);
        return updateflight;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The Flight you request is not present",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot Update data of Flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const getAllFlightsByFilters = async (query) => {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    // trips=MUM-DEL
    if (query.trips) {

        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if (departureAirportId === arrivalAirportId) {
            throw new AppError('Departure and Arrival airport not same', StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        // if(minPrice>maxPrice)
        // {
        //     throw new AppError('Min price is greater than max price', StatusCodes.BAD_REQUEST);
        // }
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? minPrice + 20000 : maxPrice)]
        }
    }
    // if (query.travellers) {
    //     customFilter.totalSeats = {
    //         [Op.gte]: query.travellers
    //     }
    // }
    // if (query.tripDate) {
    //     customFilter.departureTime = {
    //         [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
    //     }
    // }
    // if (query.sort) {
    //     const params = query.sort.split(',');
    //     const sortFilters = params.map((param) => param.split('_'));
    //     sortFilter = sortFilters
    // }
    // console.log(customFilter, sortFilter);
    try {
        const flights = await flightRepository.getAllFlightsByFilters(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
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

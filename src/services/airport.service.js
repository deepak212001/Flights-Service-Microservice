const { StatusCodes } = require("http-status-codes");

const { AirportRepository } = require("../repositories");
// const AppError = require("../utils/errors/app.error");
const AppError = require("../utils/errors/app.error");
const airportRepository = new AirportRepository(); // make a object

const createAirport = async (data) => {
    try {
        console.log("data", data);
        const airport = await airportRepository.create(data);
        return airport;
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
            "Cannot create a new Airport Object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const getAirports = async () => {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError(
            "Cannot fetch data of all airports",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const getAirport = async (id) => {
    try {
        // console.log("id")
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airport you request is not present",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot fetch data of airport",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const destoryAirport = async (id) => {
    try {
        // console.log("id")
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airport you request is not present",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot delete data of airport",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

const updateAirport = async (id, data) => {
    try {
        const updateAirport = await airportRepository.update(id, data);
        return updateAirport;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airport you request is not present",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot Update data of airport",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destoryAirport,
    updateAirport,
};

// import CrudRepository from "./crud.repository.js";
// import Airplane from "../models/airplane.js";
const { Sequelize } = require('sequelize');
const CrudRepository = require("./crud.repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');

class FlightRepository extends CrudRepository {
    constructor() {
        // super keyword help to call constructor of parents call
        super(Flight);
    }
    async getAllFlightsByFilters(filter, sort) {
        // console.log("filter", filter)
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            // ye include join kar rha hai jis se  airplaneDetail,departureAirport and arrivalAirport ka data bhi mil rha hai
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }


    async updateRemainingSeats(flightId, seats, dec = true) {
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);
            if (+dec) {
                await flight.decrement('totalSeats', { by: seats }, { transaction: transaction });
            } else {
                await flight.increment('totalSeats', { by: seats }, { transaction: transaction });
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }
}

module.exports = FlightRepository;

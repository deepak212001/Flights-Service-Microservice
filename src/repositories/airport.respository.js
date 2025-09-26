// import CrudRepository from "./crud.repository.js";
// import Airplane from "../models/airplane.js";

const CrudRepository = require("./crud.repository");
const { Airport } = require("../models");

class AirportRepository extends CrudRepository {
    constructor() {
        // super keyword help to call constructor of parents call
        super(Airport);
    }
}

module.exports = AirportRepository;

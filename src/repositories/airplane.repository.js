// import CrudRepository from "./crud.repository.js";
// import Airplane from "../models/airplane.js";

const CrudRepository = require("./crud.repository");
const { Airplane } = require("../models");

class AirplaneRepository extends CrudRepository {
  constructor() {
    // super keyword help to call constructor of parents call
    super(Airplane);
  }
}

module.exports = AirplaneRepository;

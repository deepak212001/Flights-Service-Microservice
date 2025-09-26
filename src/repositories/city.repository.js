// import CrudRepository from "./crud.repository.js";
// import Airplane from "../models/airplane.js";

const CrudRepository = require("./crud.repository");
const { City } = require("../models");

class CityRepository extends CrudRepository {
  constructor() {
    // super keyword help to call constructor of parents call
    super(City);
  }
}

module.exports = CityRepository;

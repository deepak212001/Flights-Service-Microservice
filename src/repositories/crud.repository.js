// import { logger } from "../config/index.js";
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app.error"); // const AppError = require("../utils/errors/app.error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // insert data
  async create(data) {
    console.log("data in repo", data)
    const response = await this.model.create(data);
    console.log("resp", response)
    return response;
  }

  // delete data
  async destroy(data) {
    const response = await this.model.destroy({ where: { id: data } });
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  // fetch data
  async get(data) {
    const response = await this.model.findByPk(data); // find by primary key
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  // fetch all data
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  // update data
  async update(id, data) {
    // data should be object
    // console.log("data", data)
    const response = await this.model.update(data, { where: { id: id } });
    console.log(response);
    if (response == 0) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
}

module.exports = CrudRepository;

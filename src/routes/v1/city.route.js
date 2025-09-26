const express = require("express");
const { CityController } = require("../../controllers");
// const { AirplaneMiddlewares } = require("../../middlewares");
const router = express();

//api/v1/airplanes/ ->post
router.post("/", CityController.createCity);
router.get("/", CityController.getCities);
router.get("/:id", CityController.getCity);
router.delete("/:id", CityController.destoryCity);
router.patch("/:id", CityController.updateCity);

module.exports = router;

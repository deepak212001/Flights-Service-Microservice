const express = require("express");
const { InfoController } = require("../../controllers");
const airplaneRoutes = require("./airplane.route");
const cityRoutes = require("./city.route");
const airportRoutes = require("./airport.routes.js");
const flightRoutes = require("./flight.routes.js");

const router = express.Router();

// router.get("/info", info);
router.get("/info", InfoController.info);
router.use("/airplanes", airplaneRoutes);
router.use("/airports", airportRoutes);
router.use("/cities", cityRoutes);
router.use("/flights", flightRoutes);

module.exports = router;

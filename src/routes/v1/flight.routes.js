const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");
const router = express();


router.post(
    "/",
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight
);
router.get("/search", FlightController.getAllFlightsByFilters);
router.get("/", FlightController.getFlights);
router.get("/:id", FlightController.getFlight);
router.delete("/:id", FlightController.destoryFlight);
router.patch("/:id", FlightController.updateFlight);

module.exports = router;

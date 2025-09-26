const express = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");
const router = express();


router.post(
    "/",
    AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport
);
router.get("/", AirportController.getAirports);
router.get("/:id", AirportController.getAirport);
router.delete("/:id", AirportController.destoryAirport);
router.patch("/:id", AirportController.updateAirport);

module.exports = router;

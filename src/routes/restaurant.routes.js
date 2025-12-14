const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/restaurant.controller");

router.get("/", auth, controller.getRestaurant);
router.post("/", auth, controller.saveRestaurant);

module.exports = router;

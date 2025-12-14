const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/order.controller");

router.post("/", auth, controller.createOrder);

module.exports = router;

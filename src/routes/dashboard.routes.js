const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/dashboard.controller");

// Home dashboard (today)
router.get("/today", auth, controller.getTodayDashboard);

// Insights page (7 / 30 days)
router.get("/insights", auth, controller.getInsights);
router.get("/today-orders", auth, controller.getTodayOrders);

module.exports = router;

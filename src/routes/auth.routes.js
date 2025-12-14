// routes/auth.routes.js
const router = require('express').Router();
const controller = require('../controllers/auth.controller');

router.post('/request-otp', controller.requestOtp);
router.post('/verify-otp', controller.verifyOtp);

module.exports = router;

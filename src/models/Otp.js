const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  mobile: String,
  otp: String,
  expiresAt: Date
});

module.exports = mongoose.model('Otp', OtpSchema);

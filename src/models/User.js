const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  membership: {
    type: Boolean,
    default: false
  },
  membershipStartDate: Date,
  membershipEndDate: Date
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

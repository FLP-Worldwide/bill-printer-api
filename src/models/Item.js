const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemName: String,
  price: Number,
  taxApplicable: {
    type: Boolean,
    default: false
  },
  taxPercentage: {
    type: Number,
    default: 0
  },
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    items: [
      {
        itemId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number, // base price
        qty: Number,
        taxPercent: Number,
        taxAmount: Number,
        totalAmount: Number, // price*qty + tax
      },
    ],

    subtotal: Number,
    tax: Number,
    total: Number,

    paymentMode: {
      type: String,
      default: "CASH",
    },

    billNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

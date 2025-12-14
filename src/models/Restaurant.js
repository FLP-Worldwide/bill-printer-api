const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: String,
    phone: String,
    upiId: String,
    footerMessage: String,
    fssai: String,
    gstin: String,
    taxSlab: {
      type: String,
      enum: ["Not Applicable", "5%", "12%", "18%"],
      default: "Not Applicable",
    },
    seatingCapacity: Number,
    businessType: {
      type: String,
      default: "Restaurant",
    },
    businessCategory: {
      type: String,
      default: "Food",
    },
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);

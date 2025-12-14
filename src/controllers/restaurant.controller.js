const Restaurant = require("../models/Restaurant");

exports.getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findOne({ user: req.userId });
  res.json(restaurant || null);
};

exports.saveRestaurant = async (req, res) => {
  const payload = {
    ...req.body,
    user: req.userId,
  };

  const restaurant = await Restaurant.findOneAndUpdate(
    { user: req.userId },
    payload,
    { upsert: true, new: true }
  );

  res.json(restaurant);
};

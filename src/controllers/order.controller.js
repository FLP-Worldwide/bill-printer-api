const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const {
      restaurantId,
      items,
      subtotal,
      tax,
      total,
      paymentMode,
    } = req.body;

    const order = await Order.create({
      userId: req.userId,
      restaurantId,
      items,
      subtotal,
      tax,
      total,
      paymentMode,
      billNumber: `BILL-${Date.now()}`,
    });

    
    res.json(order);
  } catch (e) {
    console.error("CREATE ORDER ERROR", e);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const Order = require("../models/Order");

/* ===============================
   TODAY DASHBOARD STATS
================================ */
exports.getTodayDashboard = async (req, res) => {
  try {
    const { restaurantId } = req.query;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      restaurantId,
      createdAt: { $gte: start, $lte: end },
    });

    const totalSales = orders.reduce(
      (sum, o) => sum + o.total,
      0
    );

    res.json({
      date: start,
      totalOrders: orders.length,
      totalSales,
    });
  } catch (e) {
    console.error("DASHBOARD ERROR", e);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};

/* ===============================
   INSIGHTS (7 / 30 DAYS)
================================ */
exports.getInsights = async (req, res) => {
  try {
    const { restaurantId, range = 7 } = req.query;

    const days = Number(range);

    const start = new Date();
    start.setDate(start.getDate() - days);
    start.setHours(0, 0, 0, 0);

    // 1️⃣ Fetch orders
    const orders = await Order.find({
      restaurantId,
      createdAt: { $gte: start },
    });

    // 2️⃣ Totals
    const totalSales = orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );

    const totalOrders = orders.length;

    // 3️⃣ Most Selling Items aggregation
    const itemMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!itemMap[item.itemId]) {
          itemMap[item.itemId] = {
            itemId: item.itemId,
            name: item.name,
            qty: 0,
          };
        }

        itemMap[item.itemId].qty += item.qty;
      });
    });

    const topItems = Object.values(itemMap)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5); // top 5 items

    // 4️⃣ Response
    res.json({
      range: days,
      totalSales,
      totalOrders,
      avgDailySales: days ? totalSales / days : 0,
      avgDailyOrders: days ? totalOrders / days : 0,
      topItems,
    });
  } catch (e) {
    console.error("INSIGHTS ERROR", e);
    res.status(500).json({ error: "Failed to load insights" });
  }
};



exports.getTodayOrders = async (req, res) => {
  try {
    const { restaurantId, type = "closed" } = req.query;

    if (!restaurantId) {
      return res.status(400).json({
        error: "restaurantId is required",
      });
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      restaurantId,
    //   status: type, // "closed" | "open"
      createdAt: { $gte: start, $lte: end },
    })
      .sort({ createdAt: -1 })
      .select(
        "_id billNumber total paymentMode status createdAt items"
      );

    res.json({
      date: start,
      type,
      totalOrders: orders.length,
      orders,
    });
  } catch (e) {
    console.error("TODAY ORDERS ERROR", e);
    res.status(500).json({
      error: "Failed to load today orders",
    });
  }
};
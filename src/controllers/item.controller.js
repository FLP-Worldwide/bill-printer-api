const Item = require("../models/Item");

/* CREATE ITEM */
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({
      userId: req.userId, // ✅ FIX
      itemName: req.body.itemName,
      price: req.body.price,
      category: req.body.category,
      taxApplicable: req.body.taxApplicable,
      taxPercentage: req.body.taxPercentage,
    });

    res.json(item);
  } catch (e) {
    console.error("CREATE ITEM ERROR:", e);
    res.status(500).json({ error: "Failed to create item" });
  }
};

/* GET ITEMS */
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({
      userId: req.userId, // ✅ FIX
    }).sort({ createdAt: -1 });

    return res.json(items || []);
  } catch (e) {
    console.error("GET ITEMS ERROR:", e);
    return res.status(500).json({ error: "Failed to load items" });
  }
};

/* UPDATE ITEM */
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // ✅ FIX
      req.body,
      { new: true }
    );

    res.json(item);
  } catch (e) {
    res.status(500).json({ error: "Update failed" });
  }
};

/* DELETE ITEM */
exports.deleteItem = async (req, res) => {
  try {
    await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId, // ✅ FIX
    });

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Delete failed" });
  }
};

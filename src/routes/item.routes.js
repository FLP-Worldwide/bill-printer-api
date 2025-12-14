const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/item.controller");

router.post("/", auth, controller.createItem);
router.get("/", auth, controller.getItems);
router.put("/:id", auth, controller.updateItem);
router.delete("/:id", auth, controller.deleteItem);

module.exports = router;

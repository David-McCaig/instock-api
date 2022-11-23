const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router.post("/", inventoryController.addInventoryItem);

module.exports = router;

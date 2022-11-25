require("dotenv").config();

const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllInventory);

router.post("/", inventoryController.addInventoryItem);

router
  .route("/:id")
  .get(inventoryController.getinventoriesById)
  .put(inventoryController.editInventory);

module.exports = router;
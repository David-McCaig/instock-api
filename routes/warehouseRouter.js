require("dotenv").config();

const express = require("express");
const router = express.Router();

const warehouseController = require("../controllers/warehouseController");

router.get("/", warehouseController.getAllWarehouses);

router.get("/:id/inventories", warehouseController.getWarehouseInventories);

module.exports = router;

require("dotenv").config();

const express = require("express");
const router = express.Router();

const warehouseController = require("../controllers/warehouseController");

router.get("/", warehouseController.getAllWarehouses);

router.post("/", warehouseController.addWarehouse);

router.get("/:id/inventories", warehouseController.getWarehouseInventories);

router
  .route("/:id")
  .get(warehouseController.getWarehouseById)
  .put(warehouseController.editWarehouse)
  .delete(warehouseController.deleteWarehouse);
  
module.exports = router;

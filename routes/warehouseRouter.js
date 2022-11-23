const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router.get("/", warehouseController.getAllWarehouses);

router
  .route("/:userId")
  .get(warehouseController.getWarehouseById)
  .delete(warehouseController.deleteWarehouse);

router.get("/:id/inventories", warehouseController.getWarehouseInventories);

module.exports = router;

const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.get('/', warehouseController.getAllWarehouses);

router.get('/:userId', warehouseController.getWarehouseById);

module.exports = router;
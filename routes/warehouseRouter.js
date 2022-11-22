require("dotenv").config();

const express = require("express");
const router = express.Router();

const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

const warehouseController = require("../controllers/warehouseController");

router.get("/", warehouseController.getAllWarehouses);

router.get("/:id/inventories", warehouseController.getWarehouseInventories);

// router.get("/:id/inventories", (req, res) => {
//   // Fetch inventory data and return
//   db("inventories")
//     .where({
//       warehouse_id: req.params.id,
//     })
//     .select("*")
//     .then((data) => {
//       if (!data.length)
//         res.status(404).json({ message: "Warehouse not found!" });
//       else res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(500).send("Error getting warehouses");
//     });
// });

module.exports = router;

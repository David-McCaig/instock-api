require("dotenv").config();
// const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

// const warehouseController = require('../controllers/warehouseController');

router.get("/:id/inventories", (req, res) => {
  // Fetch inventory data and return
  db("inventories")
    .where({
      warehouse_id: req.params.id,
    })
    .select("*")
    .then((data) => {
      if (!data[0]) res.status(500).json({message:"No"});
      else res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send("Error getting warehouses");
    });
});

module.exports = router;

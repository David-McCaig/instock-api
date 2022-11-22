require("dotenv").config();
const { PORT } = process.env;
const knex = require('knex')(require('../knexfile'));
const express = require("express");
const router = express.Router();
const uuid = require("uuid");



const getWarehouseList = (warehouseId) => {
  //
}

const getInventoryList = (warehouseId) => {
  //
};

router.get("/:id/inventories", (req, res) => {
  console.log(req.params.id);



  //Return 404 if warehouse ID not found
  //return 200 if successful with data

  return res.status(200).json({message: 'Retrieved warehouse inventory!'})
});

module.exports = router;

const knexConfig = require('../knexfile');
const db = require('knex')(knexConfig);

const getAllWarehouses = async (_req, res) => {
  const warehouseData = await db('warehouses');
  res.status(200).json(warehouseData);
};

  
  module.exports = {
    getAllWarehouses
  }

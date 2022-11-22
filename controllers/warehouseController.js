const knexConfig = require('../knexfile');
const db = require('knex')(knexConfig);

const getAllAsync = async (_req, res) => {
  const warehouseData = await db('warehouses');
  res.status(200).json(warehouseData);
};

  
  module.exports = {
    getAllAsync
  }
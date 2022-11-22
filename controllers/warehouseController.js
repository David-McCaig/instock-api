const { default: knex } = require('knex');
const knexConfig = require('../knexfile');
const db = require('knex')(knexConfig);

const getAllWarehouses = async (_req, res) => {
  const warehouseData = await db('warehouses');
  res.status(200).json(warehouseData);
};

const getWarehouseInventories = (req, res) => {
    knex('inventory')
    .where({warehouse_id: requestAnimationFrame.params.id})
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).send('Error');
    })
}
  
  module.exports = {
    getAllWarehouses, getWarehouseInventories
  }

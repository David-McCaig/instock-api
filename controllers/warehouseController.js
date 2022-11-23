const knexConfig = require('../knexfile');
const db = require('knex')(knexConfig);

const getAllWarehouses = async (_req, res) => {
  const warehouseData = await db('warehouses');
  res.status(200).json(warehouseData);
};

const getWarehouseById = async (req, res) => {
  try{
    const userData = await db('warehouses')
    .where({ id: req.params.userId })
    res.status(200).json(userData[0]);
    
  }
  catch (error){
    res.status(500).json({error:error})
  }
}



  module.exports = {
    getAllWarehouses,
    getWarehouseById
  }
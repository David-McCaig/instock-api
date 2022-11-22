const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig); //Deleted .development from knexConfig

// const getAllWarehouses = (_req, res) => {
//   db("warehouses")
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error retrieving Warehouses: ${err}`)
//     );
// };

const getWarehouseInventory = (_req, res) => {
    
}

module.exports = {
  getAllWarehouses
};

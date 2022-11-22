const knexConfig = require("../knexfile");
const db = require("knex")(knexConfig);

const getAllWarehouses = async (_req, res) => {
  const warehouseData = await db("warehouses");
  res.status(200).json(warehouseData);
};

const getWarehouseInventories = (req, res) => {
  db("inventories")
    .where({
      warehouse_id: req.params.id,
    })
    .select("*")
    .then((data) => {
      if (!data.length)
        res.status(404).json({ message: "Warehouse not found!" });
      else res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).send("Error getting warehouses");
    });
};

module.exports = {
  getAllWarehouses,
  getWarehouseInventories,
};

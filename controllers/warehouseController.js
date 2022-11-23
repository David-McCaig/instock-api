const knexConfig = require("../knexfile");
const db = require("knex")(knexConfig);

const getAllWarehouses = async (_req, res) => {
  const warehouseData = await db("warehouses");
  res.status(200).json(warehouseData);
};

const getWarehouseInventories = async (req, res) => {
  try {
    //Check if warehouse is in table
    const foundWarehouse = await db("warehouses")
      .select("*")
      .from("warehouses")
      .where({ id: req.params.id });
    //Return 404 status code if warehouse not found
    if (!foundWarehouse.length) {
      return res.status(404).json({ message: "Warehouse doesn't exist!" });
    }

    //Use found warehouse id to return inventory list
    const warehouseInventoryList = await db("inventories")
      .where({
        warehouse_id: foundWarehouse[0].id,
      })
      .select("*");
    //Return 400 if inventory list empty
    if (warehouseInventoryList.length === 0) {
      res.status(500).json({ message: "Warehouse is empty!" });
    //Otherwise return inventory list
    } else {
      res.status(200).json(warehouseInventoryList);
    }
    //Error Handling
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getAllWarehouses,
  getWarehouseInventories,
};

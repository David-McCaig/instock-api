const knexConfig = require("../knexfile");
const db = require("knex")(knexConfig);
const uuid = require("uuid");

const addInventoryItem = async (req, res) => {
  console.log(req.body);
  //Validate request body input fields
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    req.body.quantity < 0
  ) {
    return res.status(400).json({
      message:
        "Please make sure to provide warehouse, item name, description, category, status and quantity fields in your request.",
    });
  }

  try {
    //Create inventory item
    const inventoryItem = {
      ...req.body,
      id: uuid.v4(),
    }

    //Check if warehouse exists
    const foundWarehouse = await db("warehouses").where({
      id: req.body.warehouse_id,
    });
    if (!foundWarehouse.length) {
      return res.status(404).json({ message: "Warehouse doesn't exist!" });
    }

    //Check if item exists

    //Insert into inventory list
    await db("inventories").insert(inventoryItem);
    //Successful add
    res.status(201).json(inventoryItem);

  } catch (error) {
    console.log("error!");
    res.status(500).json({ error: error });
  }
};

module.exports = { addInventoryItem };

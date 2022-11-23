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
    const addedItemData = 
    await db("inventories").insert(
        {
      ...req.body,
      id: uuid.v4(),
    }
    );
    console.log(addedItemData)
    res.status(201).json(addedItemData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { addInventoryItem };

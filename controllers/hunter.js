const knexConfig = require("../knexfile");
const db = require("knex")(knexConfig);
const uuid = require("uuid");

const addWarehouse = async (req, res) => {
  console.log(req.body);
  //Validate request body input fields
  if (
    !req.body.warehouse_id ||
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res.status(400).json({
      message:
        "Please make sure to provide warehouse name, address, city, country, contact name, contact position, phone number, and email fields in your request.",
    });
  }

  try {
    //Check if warehouse exists
    const findWarehouse = await db("warehouses").where({
      id: req.body.warehouse_id,
    });
    if (findWarehouse.length) {
      return res.status(404).json({ message: "This warehouse already exists, please edit!" });
    }

    //Create inventory item
    const inventoryItem = {
      ...req.body,
      id: uuid.v4(),
    };

    //Insert into inventory list
    await db("inventories").insert(inventoryItem);
    //Successful add
    res.status(201).json(inventoryItem);
  } catch (error) {
    console.log("error!");
    res.status(500).json({ error: error });
  }
};

module.exports = { 
  getAllInventory,
  addInventoryItem
};

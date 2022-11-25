const knexConfig = require("../knexfile");
const db = require("knex")(knexConfig);
const uuid = require("uuid");

const getAllInventory = async (_req, res) => {
  try {
    const inventoryData = await db("inventories")
    .select('inventories.id', 'warehouse_name', 'item_name', 'description', 'category', 'status', 'quantity')
    .join('warehouses', {'inventories.warehouse_id': 'warehouses.id'});
    res.status(200).json(inventoryData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

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
  //Validate item quantity to not be less than 0
  if (req.body.quantity < 0) {
    return res.status(400).json({
      message: "Please ensure that stock is not a negative number!",
    });
  }
  //Validate item status and corresponding quantity
  if (
    (req.body.status === "In Stock" && req.body.quantity === 0) ||
    (req.body.status === "Out of Stock" && req.body.quantity !== 0)
  ) {
    return res.status(400).json({
      message: "Please ensure that stock status matches quantity!",
    });
  }

  try {
    //Check if warehouse exists
    const foundWarehouse = await db("warehouses").where({
      id: req.body.warehouse_id,
    });
    if (!foundWarehouse.length) {
      return res.status(404).json({ message: "Warehouse doesn't exist!" });
    }
    //Check if item exists in same warehouse
    const duplicateItem = await db("inventories").where({
      item_name: req.body.item_name,
      warehouse_id: req.body.warehouse_id,
    });
    if (duplicateItem.length) {
      return res
        .status(404)
        .json({ message: "Item already exists in warehouse, please edit!" });
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

const editInventory = async (req, res) => {
  try {
    const inventoriesData = await db("inventories")
    .where({ id: req.params.id })
    .update({
      item_name: req.body.item_name, 
      description: req.body.description, 
      category: req.body.category, status: 
      req.body.status, 
      quantity: req.body.quantity})

    res.status(200).json(inventoriesData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getinventoriesById = async (req, res) => {
  try {
    const inventoriesData = await db("inventories").where({ id: req.params.id });
    res.status(200).json(inventoriesData[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const foundInventory = await db("inventories").where({
      id: req.params.id,
    });
    if (!foundInventory.length) {
      return res.status(404).json({ message: "Inventory item doesn't exist!" });
    }

    await db('inventories').where({
        id: foundInventory[0].id
    }).del();
    res.sendStatus(204);

  } catch {
    res.status(500).json({ error: error });
  }
};

module.exports = { 
  getAllInventory,
  addInventoryItem,
  editInventory,
  getinventoriesById,
  deleteInventory
};

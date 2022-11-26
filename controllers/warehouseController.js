const knexConfig = require("../knexfile");
const db = require("knex")(knexConfig);
const uuid = require("uuid");

const validateEmail = email => RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test(email)

const validatePhoneNumber = phone => RegExp(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm).test(phone)



const getAllWarehouses = async (_req, res) => {
  const warehouseData = await db("warehouses");
  res.status(200).json(warehouseData);
};

const addWarehouse = async (req, res) => {
  console.log(req.body);
  //Validate request body input fields
  if (
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
      address: req.body.address,
    });
    if (findWarehouse.length) {
      return res.status(404).json({ message: "This warehouse already exists, please edit!" });
    }

    //Create new warehouse
    const newWarehouse = {
      ...req.body,
      id: uuid.v4(),
    };

    //Insert into warehouse list
    await db("warehouses").insert(newWarehouse);
    //Successful add
    res.status(201).json(newWarehouse);
  } catch (error) {
    console.log("error!!!");
    res.status(500).json({ error: error });
  }
};

const getWarehouseById = async (req, res) => {
  try {
    const warehouseData = await db("warehouses").where({ id: req.params.id });
    res.status(200).json(warehouseData[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getWarehouseInventories = async (req, res) => {
  try {
    //Check if warehouse is in table
    const foundWarehouse = await db("warehouses").where({ id: req.params.id });
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

const editWarehouse = async (req, res) => {

  try {
      if (!validateEmail(req.body.contact_email)) console.log('email invalid') ;
  
    if (!validatePhone(req.body.contact_phone)) console.log('phone invalid') ;

    const warehouseData = await db("warehouses")
      .where({ id: req.params.id })
      .update({
        warehouse_name: req.body.warehouse_name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contact_name: req.body.contact_name,
        contact_position: req.body.contact_position,
        contact_phone: req.body.contact_phone,
        contact_email: req.body.contact_email,
      })
    console.log('update completed')
    res.status(200).json(warehouseData);
  } catch (error) {
    console.log('catch error')
    res.status(500).json({ error });
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const foundWarehouse = await db("warehouses").where({
      id: req.params.id,
    });
    if (!foundWarehouse.length) {
      return res.status(404).json({ message: "Warehouse doesn't exist!" });
    }

    await db('warehouses').where({
      id: foundWarehouse[0].id
    }).del();
    res.sendStatus(204);

  } catch {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
  getWarehouseInventories,
  addWarehouse,
  editWarehouse,
  deleteWarehouse
};

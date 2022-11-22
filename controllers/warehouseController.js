const knexConfig = require("../knexfile");
const db = require("knex")(knexConfig);

const getAllWarehouses = async (_req, res) => {
  const warehouseData = await db("warehouses");
  res.status(200).json(warehouseData);
};

// const getWarehouseInventories = async (req, res) => {
//   try {
//     const warehouseInventoriesData = await db("inventories")
//       .where({ warehouse_id: req.params.id })
//       .select("*");

//     if (!warehouseInventoriesData.length) {
//       res.status(404).json({ message: "Warehouse not found!" });
//     } else {
//       console.log("OK");
//       res.status(200).json(warehouseInventoriesData);
//     }

//   } catch (error) {
//     res.status(500).json({error: error});
//   }
// };

const getWarehouseInventories = (req, res) => {
  db("warehouses")
    .select("*")
    .from("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
        //Handle no id found
        if (!data.length) {
            res.status(404).json({message: "Warehouse doesn't exist!"});
        }
        else {
            console.log(data[0].id)
            return data[0].id
        }
    })
    .then((data) => {
        db("inventories")
            .where({
              warehouse_id: data,
            })
            .select("*")
            .then((data) => {
              if (!data.length)
                res.status(404).json({ message: "Warehouse empty!" });
              else {
                console.log("OK");
                res.status(200).json(data);
              }
            })
            .catch(() => {
              res.status(500).send("Error getting warehouses");
            });
    });

  //   db("inventories")
  //     .where({
  //       warehouse_id: req.params.id,
  //     })
  //     .select("*")
  //     .then((data) => {
  //       if (!data.length)
  //         res.status(404).json({ message: "Warehouse not found!" });
  //       else {
  //         console.log("OK");
  //         res.status(200).json(data);
  //       }
  //     })
  //     .catch(() => {
  //       res.status(500).send("Error getting warehouses");
  //     });
};

module.exports = {
  getAllWarehouses,
  getWarehouseInventories,
};

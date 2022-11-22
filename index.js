require('dotenv').config();

// const knex = require('knex')(require('./knexfile'));
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

const warehouseRoutes = require('./routes/warehouses');
// const inventoryRoutes = require('./routes/inventories');

app.use(cors());
app.use(express.json());

app.use('/warehouses', warehouseRoutes);
// app.use('/warehouses', inventoryRoutes);

app.listen(PORT, () => {
    console.log("Only going to see this on port " + PORT);
});
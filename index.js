require('dotenv').config();

const PORT = 8000;

const warehouseRouter = require('./routes/warehouseRouter.js');
const inventoryRouter = require('./routes/inventoryRouter.js');

const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/warehouses', warehouseRouter);
app.use('/inventories', inventoryRouter);

app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`);
});
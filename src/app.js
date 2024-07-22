const express = require("express");
const app = express();
const customerRouters = require("./routes/customer.js");
const inventoryRouters = require("./routes/inventory.js");

app.use("/customer", customerRouters);
app.use("/inventory", inventoryRouters);

module.exports = app;
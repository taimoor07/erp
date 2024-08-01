const express = require("express");
const mongoose = require('mongoose');
const app = express();
const customerRouters = require("./routes/customer.js");
const inventoryRouters = require("./routes/inventory.js");

// Parse JSON payloads
app.use(express.json());

const mongodbUrl = 'mongodb://localhost:27017/erp';
const mongodbOptions = {
}

// Connect to MongoDB
mongoose.connect(mongodbUrl, mongodbOptions).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use("/customer", customerRouters);
app.use("/inventory", inventoryRouters);

module.exports = app;
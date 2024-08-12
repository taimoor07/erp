const express = require("express");
const mongoose = require('mongoose');
const app = express();
const customerRouters = require("./routes/customer.js");
const inventoryRouters = require("./routes/inventory.js");
const authRouters = require("./routes/auth.js");
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT || 3000;

// Parse JSON payloads
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use("/customer", customerRouters);
app.use("/inventory", inventoryRouters);
app.use("/auth", authRouters);

module.exports = app;
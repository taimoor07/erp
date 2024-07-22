const express = require("express");
const customerRouter = express.Router();
const { getAllCustomers, createCustomer} = require("../controllers/customer");

customerRouter.get("/all", getAllCustomers);
customerRouter.post("/create", createCustomer);

module.exports = customerRouter;
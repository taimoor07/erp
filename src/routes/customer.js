const express = require("express");
const customerRouter = express.Router();
const { getAllCustomers, getCustomer, createCustomer, deleteCustomer, updateCustomer} = require("../controllers/customer");
const { authMiddleware } = require("../middlewares/auth");

// Protected Route
customerRouter.get("/all", authMiddleware, getAllCustomers);
customerRouter.get("/:email", getCustomer);
customerRouter.delete("/:email", deleteCustomer);
customerRouter.patch("/:email", updateCustomer);
customerRouter.post("/create", createCustomer);

module.exports = customerRouter;
const express = require("express");
const inventoryRouter = express.Router();
const { getAllInventories, createInventory} = require("../controllers/inventory");

inventoryRouter.get("/all", getAllInventories);
inventoryRouter.post("/create", createInventory);

module.exports = inventoryRouter;
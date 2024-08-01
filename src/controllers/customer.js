const Customer = require("../models/customer");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    sendSuccessResponse(res, newCustomer, 'Customer created successfully');
  } catch (error) {
    sendErrorResponse(res, 400, 'Bad Request', error.message);
  }
}

// how to check indexs on my collection
// const customersIn = await Customer.collection.listIndexes().toArray();

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    sendSuccessResponse(res, customers);
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal Server Error', error.message);
  }
}

const getCustomer = async (req, res) => {

  try {
    const customer = await Customer.findOne({ email: req.params.email });
    if (!customer) {
      return sendErrorResponse(res, 404, 'Customer not found');
    }
    sendSuccessResponse(res, customer);
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal Server Error', error.message);
  }

}

const deleteCustomer = async (req, res) => {

  try {
    const email = req.params.email;
    const result = await Customer.deleteOne({ email });

    if (result.deletedCount > 0) {
      sendSuccessResponse(res, result, 'Customer deleted successfully');
    } else {
      return sendErrorResponse(res, 404, 'Customer not found');
    }
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal Server Error', error.message);
  }

}

const updateCustomer = async (req, res) => {
      try {
        const email = req.params.email;
        const updateData = req.body;
    
        const updatedCustomer = await Customer.findOneAndUpdate(
          {email},
          { $set: updateData },
          { new: true, runValidators: true }
        );
    
        if (updatedCustomer) {
          sendSuccessResponse(res, updatedCustomer, 'Customer updated successfully');
        } else {
          sendErrorResponse(res, 404, 'Customer not found');
        }
      } catch (error) {
        sendErrorResponse(res, 500, 'Internal Server Error', error.message);
      }
}


module.exports = {
    getAllCustomers, 
    createCustomer,
    getCustomer,
    deleteCustomer,
    updateCustomer
}
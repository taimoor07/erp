const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: String,
  date: { type: Date, default: Date.now },
  items: [{ item_name: String, quantity: Number, price: Number }],
  status: String
});

// Define the Customer schema with validation rules
const customerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  contact_info: {
    phone: String,
    address: String
  },
  orders: [orderSchema]
});

// Apply the transform to remove _id and __v fields
customerSchema.set('toJSON', {
    transform: (doc, ret, options) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

// To avoid exposing _id in API we can use projection like below OR we can use transform method like above
// Customer.find({}, {_id: 0}); 

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

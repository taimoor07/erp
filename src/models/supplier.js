const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  supplier_name: { type: String, required: true },
  contact_info: {
    phone: String,
    address: String
  }
});

module.exports = mongoose.model('Supplier', supplierSchema);

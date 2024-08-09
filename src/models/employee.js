const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  position: String,
  department: String,
  contact_info: {
    phone: String
  },
  salary: Number,
  hire_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);

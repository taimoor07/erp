const mongoose = require('mongoose');

// Regular expression for email validation
const emailRegex = /.+\@.+\..+/;
// /\S+@\S+\.\S+/

// Define the User schema with validation rules
const customerSchema = new mongoose.Schema({
    f_name: {
        type: String,
        trim: true,
        required: [true, 'First Name is required'],
        minlength: [3, 'First Name must be at least 3 characters long'],
        maxlength: [10, 'First Name must be at most 10 characters long'],
        match: [/^[a-zA-Z0-9]+$/, 'First Name can only contain letters and numbers']
      },
    l_name: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        minlength: [3, 'Last Name must be at least 3 characters long'],
        maxlength: [10, 'Last Name must be at most 10 characters long'],
        match: [/^[a-zA-Z0-9]+$/, 'Last Name can only contain letters and numbers']
      },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [emailRegex, 'Please fill a valid email address'],
    },
    created_at: { type: Date, default: Date.now }
});

// Apply the transform to remove _id and __v fields
customerSchema.set('toJSON', {
    transform: (doc, ret, options) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

// To avoid exposing _id in API we can use projection like below OR we can use transform method
// Customer.find({}, {_id: 0}); 

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

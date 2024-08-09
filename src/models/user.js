const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Regular expression for email validation
const emailRegex = /.+\@.+\..+/;
// /\S+@\S+\.\S+/

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['customer', 'supplier', 'employee'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [emailRegex, 'Please fill a valid email address'],
  },
  createdAt: { type: Date, default: Date.now }
});

// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
//   });
  
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

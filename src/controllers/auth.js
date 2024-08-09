const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Customer = require('../models/customer');
const Supplier = require('../models/supplier');
const Employee = require('../models/employee');
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

const signupNewUser = async (req, res) => {
    const { username, password, role, email, ...profileData } = req.body;

    try {

        // Validate role
        if(!["customer", "supplier", "employee"].includes(role)) {
            return sendErrorResponse(res, 400, 'Bad Request', "Invalid role specified.");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return sendErrorResponse(res, 400, 'Bad Request', "User already exists.");
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({ username, password: hashedPassword, role, email });
        await user.save();

        // Create Profile based on role
        let profile;
        if (role === 'customer') {
            profile = new Customer({ 
              user_id: user._id, 
              name: profileData.name,
              contact_info: {
                phone: profileData.phone,
                address: profileData.address
              } 
            });
        } else if (role === 'supplier') {
            profile = new Supplier({ user_id: user._id, ...profileData });
        } else if (role === 'employee') {
            profile = new Employee({ user_id: user._id, ...profileData });
        }

        await profile.save();
        sendSuccessResponse(res, profile, 'User created successfully');
    } catch(error) {
        sendErrorResponse(res, 400, 'Bad Request', error.message);
    }

}

const signinUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Verify the password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'pcr', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    signupNewUser, 
    signinUser
}
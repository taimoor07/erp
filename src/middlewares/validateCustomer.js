// const { body, validationResult } = require('express-validator');

// const validateCustomer = [
//   body('f_name').isLength({ min: 2 }).withMessage('First Name must be at least 2 characters long'),
//   body('l_name').isLength({ min: 2 }).withMessage('Last Name must be at least 2 characters long'),
// //   body('email').isEmail().withMessage('Must be a valid email'),
// //   body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   }
// ];

// module.exports = validateCustomer;
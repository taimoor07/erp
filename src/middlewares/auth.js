var jwt = require('jsonwebtoken');


// Create a middleware function to verify the JWT token and protect your routes
const authMiddleware = (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, 'pcr');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authMiddleware
}
  
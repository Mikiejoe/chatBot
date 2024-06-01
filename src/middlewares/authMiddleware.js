const jwt = require('jsonwebtoken');

// Middleware to verify token and append user info to req
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(!token)
  if (!token) {
    return res.status(401).send({ error: 'Access token is missing or invalid' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
    console.log(decoded)
    req.user = decoded; // Append the decoded user info to req
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;

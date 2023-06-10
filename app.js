const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the JWT token
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Store the decoded token in the request object
    req.user = decoded;
    next();
  });
}

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  // Access the authenticated user from the request object
  const user = req.user;

  // Handle the protected route logic here
  res.json({ message: 'Protected route accessed successfully', user });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

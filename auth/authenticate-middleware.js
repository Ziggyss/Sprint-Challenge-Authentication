
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'bad token: ' + err.message})
        } else {
          req.decodedToken = decodedToken;
          next()
        }
      }
    )
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};


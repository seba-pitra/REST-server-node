const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if(!token) {
    return res.status(401).json({ msg: 'There are missing token' })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

    const authenticatedUser = await User.findById(uid);

    // Verify if user have status in true
    if(!authenticatedUser.status) {
      return res.status(401).json({
        msg: 'Token is not valid - User with status: false'
      })
    }

    req.user = authenticatedUser;

    next();

  } catch (error) {
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }

};

module.exports = {
  validateJWT
}
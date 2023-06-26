const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if(!token) {
    return res.status(401).json({ msg: 'There are missing token' })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

    req.uid = uid;

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
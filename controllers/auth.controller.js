const { response } = require('express');
const bcriptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/user');

const login = async (req, res = response) => {
  try {
    const { password, email } = req.body;

    const foundUser = await User.findOne({ email });
    if(!foundUser.status) {
      return res.status(400).json({ msg: 'email and password are not correct - status: false' })
    }

    const validPassword = bcriptjs.compareSync( password, foundUser.password );
    if(!validPassword) {
      return res.status(400).json({ msg: 'User / Password are not correct - password' })
    }


    // generate JWT
    const token = await generateJWT(foundUser.id)
    
    res.status(500).json({ data: foundUser, token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Talk to admin' })
  }
}

module.exports = {
  login,
}
const { response } = require('express');
const bcriptjs = require('bcryptjs');

const User = require('../models/user');


const getUsers = async (req, res = response) => {
  const { limit = 5, since } = req.query;
  const query = { status: true }

  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip(since)
    .limit(limit)
  ])

  res.json({ total, users });
}

const postUsers = async (req,  res = response) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  const salt = bcriptjs.genSaltSync();
  user.password = bcriptjs.hashSync(password, salt);

  await user.save();

  res.json({ data: user });
}

const putUsers = async (req,  res = response) => {
  const { id } = req.params;
  const { _id ,password, google, ...restData } = req.body;


  // TODO: validate againts DB
  if(password) {
    const salt = bcriptjs.genSaltSync();
    restData.password = bcriptjs.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, restData)


  res.status(201).json({ data: updatedUser });
}

const deleteUsers = async (req,  res = response) => {
  const { id } = req.params;

  const foundUser = await User.findByIdAndUpdate(id, { status: false });

  res.json({ data: foundUser });
}


module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
}
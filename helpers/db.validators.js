const Role = require('../models/role');
const user = require('../models/user');

const isValidRol = async (rol = '') => {
  const rolAlreadyExists = await Role.findOne({ rol })
  if(!rolAlreadyExists) {
    throw new Error(`The rol ${rol} is not registered in database`);
  }
}

const emailAlreadyExists = async (email = '') => {
  const emailAlreadyExists = await user.findOne({ email })
  if(emailAlreadyExists) {
    throw new Error(`There is already a user with the email ${ email }`);
  }
}

const userAlreadyExistsWithId = async (id) => {
  const foundUser = await user.findById(id)
  if(!foundUser) {
    throw new Error(`User with this id ${ id } does not exist`);
  }
}

module.exports = {
  isValidRol, 
  emailAlreadyExists,
  userAlreadyExistsWithId
}
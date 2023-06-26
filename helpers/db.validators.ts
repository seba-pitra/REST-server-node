import { Role } from "../models/role";
import { User } from "../models/user";

export const isValidRol = async (rol = '') => {
  const rolAlreadyExists = await Role.findOne({ rol });

  if(!rolAlreadyExists) {
    throw new Error(`The rol ${rol} is not registered in database`);
  }
}

export const emailAlreadyExists = async (email = '') => {
  const emailAlreadyExists = await User.findOne({ email });

  if(emailAlreadyExists) {
    throw new Error(`There is already a user with the email ${ email }`);
  }
}

export const userAlreadyExistsWithId = async (id: string) => {
  const foundUser = await User.findById(id);

  if(!foundUser) {
    throw new Error(`User with this id ${ id } does not exist`);
  }
}
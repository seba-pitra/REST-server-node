


const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    require: [true, 'Name is required'],
  },
  email: {
    type: String,
    require: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function() {
  const { password, __v, ...user } = this.toObject();
  return user;
}


module.exports = model( 'Users', UserSchema );
import { Schema, model } from "mongoose";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  img: string;
  rol: string;
  status: boolean;
  google: boolean;
}

const UserSchema = new Schema<IUser>({
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
  const { password, __v, _id, ...user } = this.toObject();

  user.uid = _id;

  return user;
}

export const User = model<IUser>('User', UserSchema);
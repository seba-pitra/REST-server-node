import { Request, Response } from "express";
import * as bcriptjs from "bcryptjs"

import { IUser, User } from '../models/user';
import { Document } from "mongoose";


export const getUsers = async (req: Request, res: Response) => {
  const { limit = 5, since } = req.query;
  const query = { status: true }

  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip( Number(since) )
    .limit( Number(limit) )
  ])

  res.json({ total, users });
}

export const postUsers = async (req: Request, res: Response) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  const salt: string = bcriptjs.genSaltSync();
  user.password = bcriptjs.hashSync(password, salt) as string;

  await user.save();

  res.json({ data: user });
}

export const putUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id ,password, google, ...restData } = req.body;

  if(password) {
    const salt: string = bcriptjs.genSaltSync();
    restData.password = bcriptjs.hashSync(password, salt) as string;
  }

  const updatedUser: Document<IUser> = await User.findByIdAndUpdate(id, restData) as Document<IUser>;

  res.status(201).json({ data: updatedUser });
}

export const deleteUsers = async (req: Request, res: Response) => {
  const { id } = req.params;

  const foundUser: Document<IUser> = await User.findByIdAndUpdate(id, { status: false }) as Document<IUser>;

  res.json({ data: foundUser });
}
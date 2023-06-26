import { Request } from "express";
import { Response } from "express";
import { compareSync } from "bcryptjs"

import { generateJWT } from "../helpers/generateJWT";
import { IUser, User } from "../models/user";


export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const foundUser: IUser = await User.findOne({ email }) as IUser;
    
    if(!foundUser.status) {
      return res.status(400).json({ msg: 'email and password are not correct - status: false' })
    }

    const validPassword = compareSync( password, foundUser.password );
    if(!validPassword) {
      return res.status(400).json({ msg: 'User / Password are not correct - password' })
    }

    const token = await generateJWT(foundUser.id as string)
    
    res.status(500).json({ data: foundUser, token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Talk to admin' })
  }
}


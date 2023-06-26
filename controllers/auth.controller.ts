import { Request } from "express";
import { Response } from "express";
import { compareSync } from "bcryptjs"

import { generateJWT } from "../helpers/generateJWT";
import { IUser, User } from "../models/user";
import { googleVerify } from "../helpers/googleVerify";


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
    
    res.status(200).json({ data: foundUser, token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Talk to admin' })
  }
}

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;

    const { name, email, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    
    if(!user) {
      const data = {
        name,
        email,
        img,
        password: "Test password",
        rol: 'USER_ROLE',
        google: true,
      }

      user = new User(data);
      await user.save();
    }

    if(!user.status) {
      return res.status(401).json({ msg: "User blocked" })
    }

    const token = await generateJWT(user.id)

    res.status(200).json({ data: user, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Talk to admin' })
  }
}


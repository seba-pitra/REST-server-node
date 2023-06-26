import { Response } from 'express';
import { NextFunction } from 'express';
import {Request} from 'express';
import * as jwt from 'jsonwebtoken';

import { User, IUser } from '../models/user';

interface CustomRequest extends Request {
  user?: IUser;
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-token');

  if(!token) {
    return res.status(401).json({ msg: 'There are missing token' })
  }

  try {
    const { uid }: any = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY as string);

    const authenticatedUser: IUser = await User.findById(uid) as IUser;

    // Verify if user have status in true
    if(!authenticatedUser.status) {
      return res.status(401).json({
        msg: 'Token is not valid - User with status: false'
      })
    }

    (req as CustomRequest).user = authenticatedUser;

    next();

  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' })
  }

};

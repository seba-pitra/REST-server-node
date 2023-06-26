import { NextFunction } from "express";
import { IUser } from "../models/user";
import { Request, Response } from "express"

interface CustomRequest extends Request {
  user?: IUser;
}

export const isAdminRole = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { user } = req;

  if(!user) {
    return res.status(500).json({ msg: 'Attemp of verifying role without verifing token' })
  }
  
  if(user.rol !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `${ user.name } is not an admin` })
  }

  next();
};

export const hasRole = (...roles: [any]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    if(!user) {
      return res.status(500).json({ msg: 'Attemp of verifying role without verifing token' })
    }

    if( !roles.includes(user.rol) ) {
      return res.status(401).json({ msg: `Service requires one of this roles: ${ roles }`, rol: user.rol })
    }
    
    next();
  }
};

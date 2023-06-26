import * as jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();


export const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload  = { uid };

    const key: jwt.Secret = process.env.SECRET_OR_PRIVATE_KEY as string
    
    jwt.sign(
      payload, key, { expiresIn: '4h' }, 
      (err, token) => {
        if(err) {
          console.log(err);
          reject('Error generatin token')
        } else {
          resolve(token)
        }
      }
    );
  })
};



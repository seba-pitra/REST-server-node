import express, { Express } from 'express';
import cors from 'cors'
import { config } from 'dotenv';

import userRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';
import dbConnection from '../db/config.db';

config();

export class Server {
  private app: Express;
  private port: string;
  private usersPath: string;
  private authPath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    this.connectDb();

    this.middlewares();

    this.routes();
  }

  async connectDb () {
    await dbConnection()
  }

  middlewares() {
    this.app.use( cors() );

    this.app.use( express.json() );

    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use(this.usersPath, userRouter)

    this.app.use(this.authPath, authRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${ this.port }`)
    })
  }

}
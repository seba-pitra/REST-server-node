import express, { Express } from 'express';
import cors from 'cors'
import { config } from 'dotenv';

import userRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';
import dbConnection from '../db/config.db';
import catogoriesRouter from '../routes/categories.routes';

config();

export class Server {
  private app: Express;
  private port: string;
  private paths: { [key:string]: string }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    this.paths = {
      categories: '/api/categories',
      auth:       '/api/auth',
      users:      '/api/users',
    }

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
    this.app.use(this.paths.users, userRouter)
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.categories, catogoriesRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${ this.port }`)
    })
  }

}
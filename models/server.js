const express = require('express');
const cors = require('cors')
require('dotenv').config();

const userRouter = require('../routes/user.routes');
const authRouter = require('../routes/auth.routes');
const { dbConnection } = require('../db/config.db');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users' 
    this.authPath = '/api/auth/login' 

    // Connection DB
    this.connectDb();


    // Middlewares 
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();

  }

  async connectDb () {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use( cors() );

    // Read and Parse body
    this.app.use( express.json() );

    // Public Folder
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

module.exports = Server;
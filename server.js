import APP from "express";
import DBConnection from "./config/dbConnection";
import LhtLogger from "./app/utils/logger";
import HTTPHandler from "./app/utils/HTTPHandler";
import Config from "./config";
import routes from "./routes";
import passport from "passport"
import *as dotenv from "dotenv"
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose=require('mongoose');
const app = new APP();
require('./google-auth2/index')(passport)
global.lhtWebLog = LhtLogger;
global.httpResponse = HTTPHandler;
dotenv.config()

app.use(passport.initialize())
app.use(passport.session())


app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection }),
  })
) 

class Server {
  static listen() {
    Promise.all([DBConnection.connect()])
      .then(() => {
        app.listen(Config.PORT);
        lhtWebLog.info("Server:listen", `Server Started on ${Config.PORT}`);
        routes(app);
        require("./config/jobInitializer");
      })
      .catch((error) =>
        lhtWebLog.error("Server:listen", "failed to connect", { err: error })
      );
  }
}

Server.listen();

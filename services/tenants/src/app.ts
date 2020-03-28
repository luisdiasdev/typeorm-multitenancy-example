import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import AbstractController from './controller/abstract.controller';
import { Env, properties } from './config';

class App {
    private app: express.Application;

    private port: number;

    constructor(port: number, controllers: [AbstractController]) {
      this.app = express();
      this.port = port;

      this.initializeMiddlewares();
      this.initializeRoutes(controllers);
    }

    private initializeMiddlewares() {
      this.app.use(helmet());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));

      if (properties.env === Env.DEVELOPMENT) {
        this.app.use(errorHandler());
      }
    }

    private initializeRoutes(controllers: [AbstractController]) {
      controllers.forEach((controller) => {
        this.app.use(controller.path, controller.router);
      });
    }

    listen() {
      this.app.listen(this.port, () => {
        console.log(`server started on ${this.port}`);
      });
    }
}

export default App;

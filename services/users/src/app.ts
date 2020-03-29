import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import { Env, properties } from './config';
import TenantClient from './client/tenant.client';
import AbstractController from './controller/abstract.controller';
import createTenantResolver from './middleware/tenant.middleware';
import httpErrorHandler from './middleware/error.middleware';

class App {
    private app: express.Application;

    private port: number;

    constructor(port: number, controllers: [AbstractController]) {
      this.app = express();
      this.port = port;

      this.initializeMiddlewares();
      this.initializeRoutes(controllers);
      this.initializeHttpErrorHandler();
    }

    private initializeMiddlewares() {
      this.app.use(helmet());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(createTenantResolver(new TenantClient(properties.tenantUrl)));

      if (properties.env === Env.DEVELOPMENT) {
        this.app.use(errorHandler());
      }
    }

    private initializeRoutes(controllers: [AbstractController]) {
      controllers.forEach((controller) => {
        this.app.use(controller.path, controller.router);
      });
    }

    private initializeHttpErrorHandler() {
      this.app.use(httpErrorHandler);
    }

    listen() {
      this.app.listen(this.port, () => {
        console.log(`server started on ${this.port}`);
      });
    }
}

export default App;

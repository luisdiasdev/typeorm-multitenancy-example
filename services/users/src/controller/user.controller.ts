import express from 'express';
import AbstractController from './abstract.controller';

export default class UserController extends AbstractController {
    path = '/users';

    router = express.Router();

    constructor() {
      super();
      this.initializeRoutes();
    }

    private initializeRoutes() {
      this.router.get('/', this.getAll);
    }

    private getAll = async (request: express.Request, response: express.Response) => {
      response.send([response.locals.slug]);
    }
}

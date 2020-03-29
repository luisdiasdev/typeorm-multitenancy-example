import express from 'express';
import { Repository } from 'typeorm';
import HttpException from '../../shared/exception/HttpException';
import { injectRepository } from '../../shared/middleware/tenant.middleware';
import AbstractController from '../../shared/controller/abstract.controller';
import validateRequest from '../../shared/middleware/validation.middleware';
import CreateUserRequest from '../dto/create.request';
import User from '../model';

export default class UserController extends AbstractController {
    path = '/users';

    router = express.Router();

    constructor() {
      super();
      this.initializeRoutes();
    }

    private initializeRoutes() {
      this.router.use(injectRepository(User));
      this.router.get('/', this.getAll);
      this.router.post('/', validateRequest(CreateUserRequest), this.save);
    }

    private getAll = async (request: express.Request, response: express.Response) => {
      const repository = response.locals.repository as Repository<User>;

      response.send(await repository.find());
    }

    private save = async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction) => {
      const repository = response.locals.repository as Repository<User>;
      const user: User = request.body;

      const existingUser = this.findByUsername(repository, user.username);

      if (existingUser) {
        next(new HttpException(422, 'Username already taken'));
        return;
      }

      try {
        response.status(201).send(await repository.save(user));
      } catch (error) {
        next(new HttpException(422, 'Could not save user'));
      }
    }

    private findByUsername = async (repository: Repository<User>, username: string) => repository.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne()
}

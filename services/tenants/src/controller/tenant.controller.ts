import express from 'express';
import { getRepository } from 'typeorm';
import AbstractController from './abstract.controller';
import Tenant from '../model/tenant.model';

class TenantController extends AbstractController {
  public path = '/tenants';

  public router = express.Router();

  private repository = getRepository(Tenant);

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.save);
  }

  private getAll = async (request: express.Request, response: express.Response) => {
    response.send(await this.repository.find());
  }

  private save = async (request: express.Request, response: express.Response) => {
    const tenant = new Tenant();
    tenant.slug = 'bigcompany';

    response.send(await this.repository.save(tenant));
  }
}

export default TenantController;

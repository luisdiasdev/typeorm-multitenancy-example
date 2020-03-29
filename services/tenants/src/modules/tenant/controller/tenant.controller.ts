import express from 'express';
import { getRepository } from 'typeorm';
import HttpException from '../../shared/exception/HttpException';
import AbstractController from '../../shared/controller/abstract.controller';
import validationMiddleware from '../../shared/middleware/validation.middleware';
import Tenant from '../model/tenant.model';
import CreateTenantRequest from '../dto/createTenant.request';

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
    this.router.get('/:slug', this.getBySlug);
    this.router.post('/', validationMiddleware(CreateTenantRequest), this.save);
  }

  private getAll = async (request: express.Request, response: express.Response) => {
    response.send(await this.repository.find());
  }

  private getBySlug = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    const tenant = await this.findBySlug(request.params.slug);

    if (tenant) {
      response.send(tenant);
      return;
    }

    next(new HttpException(404, 'Could not found tenant with the given slug'));
  }

  private save = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    const tenant: Tenant = Object.assign(new Tenant(), request.body);
    const existingTenant = await this.findBySlug(tenant.slug);

    if (!existingTenant) {
      response.status(201).send(await this.repository.save(tenant));
      return;
    }

    next(new HttpException(422, 'Slug is already taken'));
  }

  private async findBySlug(slug: string) {
    return this.repository.createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.config', 'tenants_config')
      .where('tenant.slug = :slug', { slug })
      .getOne();
  }
}

export default TenantController;

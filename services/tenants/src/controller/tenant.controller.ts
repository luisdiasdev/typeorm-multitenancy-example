import express from 'express';
import { getRepository } from 'typeorm';
import AbstractController from './abstract.controller';
import Tenant from '../model/tenant.model';
import validationMiddleware from '../middleware/validation.middleware';
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

  private getBySlug = async (request: express.Request, response: express.Response) => {
    const tenant = await this.findBySlug(request.params.slug);

    if (tenant) {
      return response.json(tenant);
    }

    response.status(404).json({
      message: 'Could not found tenant with the given slug',
    });
  }

  private save = async (request: express.Request, response: express.Response) => {
    const tenant: Tenant = Object.assign(new Tenant(), request.body);
    const existingTenant = await this.findBySlug(tenant.slug);

    if (!existingTenant) {
      return response.status(201).json(await this.repository.save(tenant));
    }

    response.status(422).json({
      message: 'Slug is already taken',
    });
  }

  private async findBySlug(slug: string) {
    return this.repository.createQueryBuilder('tenant')
      .leftJoinAndSelect('tenant.config', 'tenants_config')
      .where('tenant.slug = :slug', { slug })
      .getOne();
  }
}

export default TenantController;

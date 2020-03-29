import express from 'express';
import { ObjectType, getRepository } from 'typeorm';
import TenantClient from '../../tenant/client';
import getOrConnectTenantDatabase from '../../../config/database/createTenantDatabase';
import HttpException from '../exception/HttpException';

const TENANT_SLUG_HEADER = 'App-Tenant-Slug';

export function injectRepository<T>(targetModel: ObjectType<T>): express.Handler {
  return function resolver(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    const tenantSlug = response.locals.slug;

    if (tenantSlug) {
      const repository = getRepository(targetModel, tenantSlug);
      response.locals.repository = repository;
      next();
      return;
    }
    next(new HttpException(400, 'Could not complete the request'));
  };
}

export default function createTenantResolver(client: TenantClient): express.Handler {
  return async function resolver(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    const tenantSlug = request.header(TENANT_SLUG_HEADER);

    if (tenantSlug) {
      const tenant = await client.getBySlug(tenantSlug);
      await getOrConnectTenantDatabase(tenantSlug, tenant.config);
      // At this point we assure the tenant db is initialized
      // So we pass the slug for the response.internals to be querried
      // by the controller
      response.locals.slug = tenantSlug;
      next();
      return;
    }
    next(new HttpException(400, 'Could not complete the request'));
  };
}

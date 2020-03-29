import express from 'express';
import TenantClient from '../client/tenant.client';
import getOrConnectTenantDatabase from '../config/database/createTenantDatabase';

const TENANT_SLUG_HEADER = 'App-Tenant-Slug';

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
    response.status(400).json({
      message: 'Could not complete the request',
    });
  };
}

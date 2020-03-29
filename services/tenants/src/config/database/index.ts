import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import TenantConfig from '../../modules/tenant/model/tenantConfig.model';
import Tenant from '../../modules/tenant/model/tenant.model';
import properties from '../properties';

export default async function createDatabaseConnection() {
  return createConnection({
    type: 'postgres',
    url: properties.databaseUrl,
    schema: 'public',
    entities: [
      Tenant,
      TenantConfig,
    ],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
}

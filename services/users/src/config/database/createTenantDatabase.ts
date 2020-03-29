import { getConnectionManager, ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import User from '../../model/user.model';
import TenantConfig from '../../dto/tenantConfig.response';

async function connectTenantDatabase(slug: string, options: ConnectionOptions) {
  const connection = getConnectionManager().create({
    name: slug,
    ...options,
    entities: [
      User,
    ],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  });

  await connection.connect();
}

export default async function getOrConnectTenantDatabase(slug: string, options: TenantConfig) {
  const connectionManager = getConnectionManager();
  if (!connectionManager.has(slug)) {
    return connectTenantDatabase(slug, {
      type: 'postgres',
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      schema: 'public',
    });
  }
  return connectionManager.get(slug);
}

import App from './app';
import { properties, createDatabaseConnection } from './config';
import TenantController from './modules/tenant/controller/tenant.controller';

async function bootstrap() {
  await createDatabaseConnection();

  const app = new App(
    properties.port,
    [
      new TenantController(),
    ],
  );

  app.listen();
}

bootstrap();

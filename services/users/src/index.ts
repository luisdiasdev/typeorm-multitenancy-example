import App from './app';
import { properties } from './config';
import UserController from './controller/user.controller';

async function bootstrap() {
  const app = new App(
    properties.port,
    [
      new UserController(),
    ],
  );

  app.listen();
}

bootstrap();

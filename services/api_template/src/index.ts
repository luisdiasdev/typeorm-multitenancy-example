import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import properties, { Env } from './config';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (properties.env === Env.DEVELOPMENT) {
  app.use(errorHandler());
}

app.get('/', (req, res) => res.json({ hello: 'world' }));

app.listen(properties.port, () => console.log(`server started on ${properties.port}`));

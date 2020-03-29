import { Request, Response, NextFunction } from 'express';
import HttpException from '../exception/HttpException';

export default function httpErrorHandler(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction, // eslint-disable-line
) {
  const status = error.status || 500;
  const message = error.message || 'Oops, something went wrong';

  response.status(status).send({ message });
}

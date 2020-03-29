import { Request, Response, NextFunction } from 'express';
import HttpException from '../exception/HttpException';
import ValidationException from '../exception/ValidationException';

export default function httpErrorHandler(
  error: HttpException | ValidationException,
  request: Request,
  response: Response,
  next: NextFunction, // eslint-disable-line
) {
  const status = error.status || 500;
  const message = error.message || 'Oops, something went wrong';
  const validation = (error as ValidationException)?.validationErrors;
  response.status(status).send({ message, errors: validation });
}

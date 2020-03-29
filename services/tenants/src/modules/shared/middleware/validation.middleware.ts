import express from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import ValidationException from '../exception/ValidationException';

class ValidationOptions {
    skipMissingProperties?: boolean = false;
}

export default function validationMiddleware<T>(
  type: any,
  options?: ValidationOptions | undefined,
): express.RequestHandler {
  return (request, response, next) => {
    validate(plainToClass(type, request.body), options)
      .then((errors) => {
        if (errors.length > 0) {
          next(new ValidationException(errors));
        } else {
          next();
        }
      });
  };
}

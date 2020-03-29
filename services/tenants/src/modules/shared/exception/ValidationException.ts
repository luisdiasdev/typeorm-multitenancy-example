import { ValidationError } from 'class-validator';
import HttpException from './HttpException';

function addParentPropertyPath(parentProperty: string, constraint: string): string {
  return `${parentProperty}.${constraint}`;
}

function getErrorMessage(errors: ValidationError[]) {
  return errors.map((error: ValidationError) => {
    if (error.children.length > 0) {
      const parentProperty = error.property;
      return error.children
        .map((childError: ValidationError) => Object.values(childError.constraints)
          .map((constraint) => addParentPropertyPath(parentProperty, constraint)))
        .reduce((prev, current) => [...prev, ...current], []);
    }
    return Object.values(error.constraints);
  }).reduce((prev, current) => [...prev, ...current], []);
}

class ValidationException extends HttpException {
  public validationErrors?: string[];

  constructor(validationErrors: ValidationError[]) {
    super(400, 'error validating your request');
    this.validationErrors = getErrorMessage(validationErrors);
  }
}

export default ValidationException;

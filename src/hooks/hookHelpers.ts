import * as Validator from "validator";
import { BadRequest } from "@feathersjs/errors";
import { ObjectID } from "bson";

export function validateString(input: any, prop: string, errors: any) {
  if (input[prop] !== undefined) {
    if (typeof input[prop] !== "string") {
      if (!Validator.isEmpty(input[prop]) && !Validator.isAscii(input[prop]))
        throw new BadRequest(errors[prop]);
      else if (Validator.isEmpty(input[prop]))
        throw new BadRequest(errors[prop]);
    }

    return input[prop];
  }
}

export function validateNumber(input: any, prop: string, errors: any) {
  if (input[prop] !== undefined) {
    if (typeof input[prop] !== "number") {
      if (!Validator.isEmpty(input[prop]) && !Validator.isNumeric(input[prop]))
        throw new BadRequest(errors[prop]);
      else if (Validator.isEmpty(input[prop]))
        throw new BadRequest(errors[prop]);
      else input[prop] = parseInt(input[prop]);
    }

    return input[prop];
  }
}

export function validateEmail(input: any, prop: string, errors: any) {
  if (input[prop] !== undefined) {
    if (typeof input[prop] !== "string") {
      if (!Validator.isEmpty(input[prop]) && !Validator.isEmail(input[prop]))
        throw new BadRequest(errors[prop]);
      else if (Validator.isEmpty(input[prop]))
        throw new BadRequest(errors[prop]);
    }

    return input[prop];
  }
}

export function validateId(input: any, prop: string, errors: any) {
  if (input[prop] !== undefined) {
    if (!ObjectID.isValid(input[prop])) throw new BadRequest(errors[prop]);

    return input[prop];
  }
}

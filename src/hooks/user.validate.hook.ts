// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import * as Validator from "validate.js";
import * as Validator2 from "validator";
import { User } from "../classes/user.class";
import { BadRequest } from "@feathersjs/errors";
import { ObjectID } from "bson";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;

    if (method === "create" || method === "update") {
      /* check if present datas are valid*/

      if (!Validator.isString(oldData.name))
        throw new BadRequest(User.Errors.name);

      if (
        !Validator.isString(oldData.email) ||
        !Validator2.isEmail(oldData.email)
      )
        throw new BadRequest(User.Errors.email);

      if (!Validator.isString(oldData.password))
        throw new BadRequest(User.Errors.password);

      if (!Validator.isString(oldData.password))
        throw new BadRequest(User.Errors.password);

      if (!Validator.isInteger(oldData.gender))
        throw new BadRequest(User.Errors.gender);

      if (oldData.role) {
        if (!Validator.isObject(oldData.role))
          throw new BadRequest(User.Errors.role);
      } else if (oldData.roleId) {
        if (!ObjectID.isValid(oldData.roleId))
          throw new BadRequest(User.Errors.roleId);
      } else {
        throw new BadRequest(User.Errors.role);
      }

      let newData = User.fromFrontToDb(oldData);

      context.data = newData;
    }

    return context;
  };
};

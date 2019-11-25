// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { Role, RoleModel } from "../../classes/role.class";
import * as Validator from "validate.js";
import { BadRequest } from "@feathersjs/errors";
import { ObjectID } from "bson";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    const { query = {} } = context.params;

    if (query._id) {
      if (typeof query._id === "string") {
        query._id = new ObjectID(query._id);
      } else if (query._id.$in) {
        query._id.$in = query._id.$in.map(id => new ObjectID(id));
      }
    }
    if (method === "create" || method === "update") {
      /* check if present datas are valid*/

      if (!Validator.isString(oldData.icon))
        throw new BadRequest(Role.Errors.icon);

      if (!Validator.isString(oldData.name))
        throw new BadRequest(Role.Errors.name);

      if (!Validator.isInteger(oldData.permissionLevel))
        throw new BadRequest(Role.Errors.permissionLevel);

      let newData = Role.fromFrontToDb(oldData);

      context.data = newData;
    }

    return context;
  };
};

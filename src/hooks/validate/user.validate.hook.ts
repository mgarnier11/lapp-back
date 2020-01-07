// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import isUUID from "is-uuid";
import * as Validator from "validate.js";
import * as Validator2 from "validator";
import { User } from "../../classes/user.class";
import { Role } from "../../classes/role.class";
import { BadRequest } from "@feathersjs/errors";
import { ObjectID } from "bson";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    const params = context.params;
    const app = context.app;

    const { query = {} } = context.params;

    if (query._id) {
      if (typeof query._id === "string") {
        query._id = new ObjectID(query._id);
      } else if (query._id.$in) {
        query._id.$in = query._id.$in.map(id => new ObjectID(id));
      }
    }

    if (method === "create" || method === "patch") {
      /* check if present datas are valid*/

      if (!Validator.isString(oldData.name) || Validator2.isEmpty(oldData.name))
        throw new BadRequest(User.Errors.name);

      let presentNames = await context.app.service("users").find({
        query: {
          name: oldData.name
        }
      });
      if (presentNames.length > 0) throw new BadRequest(User.Errors.name);

      if (
        !Validator.isString(oldData.email) ||
        !Validator2.isEmail(oldData.email) ||
        Validator2.isEmpty(oldData.email)
      )
        if (!isUUID.v1(oldData.email)) throw new BadRequest(User.Errors.email);

      let presentEmails = await context.app.service("users").find({
        query: {
          email: oldData.email
        }
      });
      if (presentEmails.length > 0) throw new BadRequest(User.Errors.email);

      if (!Validator.isString(oldData.password) || oldData.password.length < 8)
        throw new BadRequest(User.Errors.password);

      if (!Validator.isInteger(oldData.gender))
        throw new BadRequest(User.Errors.gender);

      let newData = User.fromFrontToDb(oldData);

      if (method === "create") {
        let userRoles = await app
          .service("roles")
          .find({ query: { name: "user" } });
        let userRole = userRoles[0];

        if (userRole) newData.roleId = userRole.id;
        else throw new BadRequest(Role.Errors.UserRoleNotCreated);
      } else {
        if (oldData.role) {
          if (!Validator.isObject(oldData.role))
            throw new BadRequest(User.Errors.role);
        } else if (oldData.roleId) {
          if (!ObjectID.isValid(oldData.roleId))
            throw new BadRequest(User.Errors.roleId);
        } else {
          throw new BadRequest(User.Errors.role);
        }
      }

      context.data = newData;
    }

    return context;
  };
};

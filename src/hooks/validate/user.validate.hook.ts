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

    if (oldData && isUUID.v1(oldData.email)) {
      if (method === "create") {
        if (await context.app.service("users").isEmailPresent(oldData.email))
          throw new BadRequest(User.Errors.email);

        const name = await app.service("users").getNextIDViceName();
        const password = User.generatePwd(oldData.email, name).toString();
        const gender = -1;
        const darkMode = false;

        let idViceUser = User.fromFrontToDb({
          name,
          email: oldData.email,
          password,
          gender,
          darkMode
        });

        idViceUser.roleId = (
          await context.app.service("roles").getUserRole()
        ).id;

        context.params.password = password;
        context.data = idViceUser;
      } else {
        throw new BadRequest(User.Errors.idVice);
      }
    }

    if (
      (method === "create" || method === "patch") &&
      !isUUID.v1(oldData.email)
    ) {
      /* check if present datas are valid*/

      if (
        !Validator.isString(oldData.name) ||
        Validator2.isEmpty(oldData.name) ||
        (await context.app.service("users").isNamePresent(oldData.name))
      )
        throw new BadRequest(User.Errors.name);

      if (
        !Validator.isString(oldData.email) ||
        !Validator2.isEmail(oldData.email) ||
        Validator2.isEmpty(oldData.email) ||
        (await context.app.service("users").isEmailPresent(oldData.email))
      )
        throw new BadRequest(User.Errors.email);

      if (!Validator.isString(oldData.password) || oldData.password.length < 8)
        throw new BadRequest(User.Errors.password);

      if (!Validator.isInteger(oldData.gender))
        throw new BadRequest(User.Errors.gender);

      if (!Validator.isBoolean(oldData.darkMode))
        throw new BadRequest(User.Errors.darkMode);

      let newData = User.fromFrontToDb(oldData);

      if (method === "create") {
        newData.roleId = (await context.app.service("roles").getUserRole()).id;
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

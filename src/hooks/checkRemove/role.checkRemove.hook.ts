// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { Role } from "../../classes/role.class";
import { BadRequest } from "@feathersjs/errors";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    let users = await context.app.service("users").find({
      query: {
        roleId: context.id
      }
    });

    if (users.length > 0) throw new BadRequest(Role.Errors.UsersAssigned);

    return context;
  };
};

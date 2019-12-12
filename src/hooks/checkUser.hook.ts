// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import { adminPermissionLevel } from "../services/consts";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const user = (context.params as any).user;

    if (!user) {
      throw new BadRequest("Not authenticated");
    }

    if (user._id !== context.id) {
      if (user._role._permissionLevel < adminPermissionLevel) {
        throw new BadRequest("You dont have the right to do that");
      }
    }

    return context;
  };
};

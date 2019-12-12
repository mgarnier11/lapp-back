// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { User } from "../classes/user.class";
import { BadRequest } from "@feathersjs/errors";

export default (permissionLevel: number): Hook => {
  return async (context: HookContext) => {
    const user = (context.params as any).user;

    if (!user) {
      throw new BadRequest("Not authenticated");
    } else if (!user._role) {
      throw new BadRequest("No role defined");
    } else if (user._role._permissionLevel < permissionLevel) {
      throw new BadRequest("You dont have the right to do that");
    }

    return context;
  };
};

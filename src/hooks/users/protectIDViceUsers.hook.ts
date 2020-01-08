// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import isUUID from "is-uuid";
import { NotFound } from "@feathersjs/errors";
import { User } from "../../classes/user.class";

export const afterFindHook = (options = {}): Hook => {
  return async (context: HookContext) => {
    context.dispatch = context.result.filter(u => !isIDVice(u));

    return context;
  };
};

export const afterGetHook = (options = {}): Hook => {
  return async (context: HookContext) => {
    if (isIDVice(context.result as User))
      throw new NotFound(`No record found for id '${context.id}'`);
  };
};

export const afterCreateHook = (options = {}): Hook => {
  return async (context: HookContext) => {
    if (context.params.password)
      context.dispatch = {
        ...context.result,
        _password: context.params.password
      };
  };
};
function isIDVice(user: User): boolean {
  return isUUID.v1(user.email);
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import { adminPermissionLevel } from "../services/consts";

export default (options = {}): Hook => {
  return (context: HookContext) => {
    const query = context.params.query;

    if (query) {
      for (let field in query) {
        if (query[field].$search && field.indexOf("$") == -1) {
          query[field] = { $regex: new RegExp(query[field].$search, "i") };
        }
      }
    }

    context.params.query = query;

    return context;
  };
};

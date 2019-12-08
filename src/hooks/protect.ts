// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { clone } from "lodash";

export default (...fields: string[]): Hook => {
  return async (context: HookContext) => {
    const result = context.dispatch || context.result;
    const o = oldData => {
      let data = clone(oldData);

      for (const f of fields) {
        let fIsGetter = Object.getOwnPropertyDescriptor(data, f) === undefined;

        if (fIsGetter) delete data["_" + f];
        else delete data[f];
      }

      return data;
    };

    if (!result) {
      return context;
    }

    if (Array.isArray(result)) {
      context.dispatch = result.map(o);
    } else if (result.data && context.method === "find") {
      context.dispatch = Object.assign({}, result, {
        data: result.data.map(o)
      });
    } else {
      context.dispatch = o(result);
    }
    if (context.params && context.params.provider) {
      context.result = context.dispatch;
    }
    return context;
  };
};

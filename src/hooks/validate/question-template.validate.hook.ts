// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import * as Validator from "validate.js";
import { QuestionTemplate } from "../../classes/questionTemplate.class";
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
    if (method === "create" || method === "patch") {
      /* check if present datas are valid*/

      if (!Validator.isString(oldData.name))
        throw new BadRequest(QuestionTemplate.Errors.name);

      if (!Validator.isString(oldData.clientPath))
        throw new BadRequest(QuestionTemplate.Errors.clientPath);

      let newData = QuestionTemplate.fromFrontToDb(oldData);

      context.data = newData;
    }

    return context;
  };
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import * as Validator from "validate.js";
import { QuestionType } from "../../classes/questionType.class";
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
        query._id.$in = query._id.$in.map((id) => new ObjectID(id));
      }
    }
    if (method === "create" || method === "patch") {
      /* check if present datas are valid*/

      if (!Validator.isString(oldData.name))
        throw new BadRequest(QuestionType.Errors.name);

      if (!Validator.isString(oldData.description))
        throw new BadRequest(QuestionType.Errors.description);

      if (oldData.template) {
        if (!Validator.isObject(oldData.template))
          throw new BadRequest(QuestionType.Errors.template);
      } else if (oldData.templateId) {
        if (!ObjectID.isValid(oldData.templateId))
          throw new BadRequest(QuestionType.Errors.template);
      } else {
        throw new BadRequest(QuestionType.Errors.template);
      }

      if (!Validator.isString(oldData.icon))
        throw new BadRequest(QuestionType.Errors.icon);

      if (!Validator.isBoolean(oldData.allowParameters))
        throw new BadRequest(QuestionType.Errors.allowParameters);

      let newData = QuestionType.fromFrontToDb(oldData);

      context.data = newData;
    }

    return context;
  };
};

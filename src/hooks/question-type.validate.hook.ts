// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import * as Validator from "validate.js";
import { QuestionType } from "../classes/questionType.class";
import { BadRequest } from "@feathersjs/errors";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;

    if (method === "create" || method === "update") {
      /* check if present datas are valid*/

      if (!Validator.isString(oldData.name))
        throw new BadRequest(QuestionType.Errors.name);

      let newData = QuestionType.fromFrontToDb(oldData);

      context.data = newData;
    }

    return context;
  };
};

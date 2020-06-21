// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import { QuestionTemplate } from "../../classes/questionTemplate.class";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    let questions = await context.app.service("question-types").find({
      query: {
        templateId: context.id
      }
    });

    if (questions.length > 0)
      throw new BadRequest(QuestionTemplate.Errors.TypesAssigned);

    return context;
  };
};

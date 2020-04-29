// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { QuestionType } from "../../classes/questionType.class";
import { BadRequest } from "@feathersjs/errors";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    let questions = await context.app.service("questions").find({
      query: {
        typeId: context.id,
      },
    });

    if (questions.length > 0)
      throw new BadRequest(QuestionType.Errors.QuestionsAssigned);

    return context;
  };
};

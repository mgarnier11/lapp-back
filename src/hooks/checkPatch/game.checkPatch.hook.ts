// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { QuestionType } from "../../classes/questionType.class";
import { BadRequest } from "@feathersjs/errors";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    let game = await context.app.service("games").get(context.id);

    if (String(game.creator.id) !== String((context.params as any).user.id))
      throw new BadRequest("Not authorized");

    return context;
  };
};

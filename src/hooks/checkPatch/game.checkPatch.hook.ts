// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { QuestionType } from "../../classes/questionType.class";
import { BadRequest } from "@feathersjs/errors";
import { User } from "../../classes/user.class";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const game = await context.app.service("games").get(context.id);
    const params = context.params as any;

    if (
      String(game.creator.id) !==
      (params instanceof User ? String(params.id) : String(params.user.id))
    )
      throw new BadRequest("Not authorized");

    return context;
  };
};

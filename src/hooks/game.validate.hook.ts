// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import * as Helper from "./hookHelpers";
import * as Validator from "validate.js";
import { Game, GameModel } from "../classes/game.class";
import { BadRequest } from "@feathersjs/errors";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;

    if (method === "create" || method === "update") {
      /* check if present datas are valid*/

      if (!Validator.isString(oldData.displayId))
        throw new BadRequest(Game.Errors.displayId);

      if (!Validator.isString(oldData.name))
        throw new BadRequest(Game.Errors.name);

      if (oldData.users) {
        if (!Validator.isArray(oldData.users))
          throw new BadRequest(Game.Errors.users);
      } else if (oldData.userIds) {
        if (!Validator.isArray(oldData.userIds))
          throw new BadRequest(Game.Errors.userIds);
      } else {
        throw new BadRequest(Game.Errors.users);
      }

      if (!Validator.isInteger(oldData.nbTurns))
        throw new BadRequest(Game.Errors.nbTurns);

      if (!Validator.isInteger(oldData.actualTurn))
        throw new BadRequest(Game.Errors.actualTurn);

      if (oldData.questionTypes) {
        if (!Validator.isArray(oldData.questionTypes))
          throw new BadRequest(Game.Errors.questionTypes);
      } else if (oldData.questionTypesIds) {
        if (!Validator.isArray(oldData.questionTypesIds))
          throw new BadRequest(Game.Errors.questionTypesIds);
      } else {
        throw new BadRequest(Game.Errors.questionTypes);
      }

      if (!Validator.isInteger(oldData.maxDifficulty))
        throw new BadRequest(Game.Errors.maxDifficulty);

      if (!Validator.isInteger(oldData.maxHotLevel))
        throw new BadRequest(Game.Errors.maxHotLevel);

      if (!Validator.isObject(oldData.creator))
        throw new BadRequest(Game.Errors.creator);

      let newData = Game.fromFrontToDb(oldData);

      context.data = newData;
    }

    return context;
  };
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import * as Helper from "../hookHelpers";
import * as Validator from "validate.js";
import { Game, GameModel, GameStatus } from "../../classes/game.class";
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

      if (oldData.type) {
        if (!Validator.isObject(oldData.type))
          throw new BadRequest(Game.Errors.type);
      } else if (oldData.typeId) {
        if (!Validator.isInteger(oldData.typeId))
          throw new BadRequest(Game.Errors.type);
      } else {
        throw new BadRequest(Game.Errors.type);
      }

      if (oldData.status) {
        if (!Validator.isString(oldData.status))
          throw new BadRequest(Game.Errors.status);
      }

      let newData = Game.fromFrontToDb(oldData);

      if (method === "create") {
        if (context.params.user)
          newData.creatorId = context.params.user.id.toString();
        newData.creationDate = new Date();
        newData.status = GameStatus.created;
        newData.displayId = generateDisplayId(context.app);
      }

      context.data = newData;
    }

    return context;
  };
};

function generateDisplayId(app: Application<{}>): string {
  let displayId = makeid(5);

  let existingGames = app.service("games").find({
    query: {
      displayId
    }
  });

  if (existingGames.length > 0) return generateDisplayId(app);
  else return displayId;
}

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

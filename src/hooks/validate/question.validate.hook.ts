// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import * as Validator from "validate.js";
import { Question } from "../../classes/question.class";
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

      if (!Validator.isString(oldData.text))
        throw new BadRequest(Question.Errors.text);

      if (
        !Validator.isInteger(oldData.difficulty) ||
        oldData.difficulty < 1 ||
        oldData.difficulty > 5
      )
        throw new BadRequest(Question.Errors.difficulty);

      if (
        !Validator.isInteger(oldData.hotLevel) ||
        oldData.hotLevel < 1 ||
        oldData.hotLevel > 5
      )
        throw new BadRequest(Question.Errors.hotLevel);

      if (oldData.type) {
        if (!Validator.isObject(oldData.type))
          throw new BadRequest(Question.Errors.type);
      } else if (oldData.typeId) {
        if (!ObjectID.isValid(oldData.roleId))
          throw new BadRequest(Question.Errors.type);
      } else {
        throw new BadRequest(Question.Errors.type);
      }

      let newData = Question.fromFrontToDb(oldData);

      if (method === "create") {
        if (context.params.user)
          newData.creatorId = context.params.user.id.toString();
        newData.creationDate = new Date();
      }

      if (context.params.user)
        newData.updaterId = context.params.user.id.toString();
      newData.updateDate = new Date();

      context.data = newData;
    }

    return context;
  };
};

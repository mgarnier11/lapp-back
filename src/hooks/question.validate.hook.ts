// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import * as Helper from './hookHelpers';
import { Question } from '../classes/question.class';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    let newData: any = {};

    if (!(oldData instanceof Question)) {
      if (method === 'create' || method === 'update' || method === 'patch') {
        newData.text = Helper.validateString(oldData, 'text', Question.Errors);

        newData.typeId = Helper.validateId(oldData, 'typeId', Question.Errors);
        newData.difficulty = Helper.validateNumber(
          oldData,
          'difficulty',
          Question.Errors
        );
        newData.hotLevel = Helper.validateNumber(
          oldData,
          'hotLevel',
          Question.Errors
        );

        context.data = newData;
      }
    }

    return context;
  };
};

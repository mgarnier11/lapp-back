// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import * as Helper from './hookHelpers';
import { QuestionType } from '../classes/questionType.class';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    let newData: any = {};

    if (!(oldData instanceof QuestionType)) {
      if (method === 'create' || method === 'update' || method === 'patch') {
        newData.name = Helper.validateString(
          oldData,
          'name',
          QuestionType.Errors
        );

        context.data = newData;
      }
    }

    return context;
  };
};

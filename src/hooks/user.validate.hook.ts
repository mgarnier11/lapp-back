// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import * as Helper from './hookHelpers';
import { User } from '../classes/user.class';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    let newData: any = {};

    if (!(oldData instanceof User)) {
      if (method === 'create' || method === 'update' || method === 'patch') {
        newData.name = Helper.validateString(oldData, 'name', User.Errors);
        newData.email = Helper.validateEmail(oldData, 'email', User.Errors);
        newData.password = Helper.validateString(
          oldData,
          'password',
          User.Errors
        );
        newData.roleId = Helper.validateId(oldData, 'roleId', User.Errors);
        newData.gender = Helper.validateNumber(oldData, 'gender', User.Errors);

        context.data = newData;
      }
    }

    return context;
  };
};

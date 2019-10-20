// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Role, RoleModel } from '../classes/role.class';
import * as Validator from 'validator';
import * as Helper from './hookHelpers';
import { BadRequest } from '@feathersjs/errors';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    let newData: any = {};
    if (!(oldData instanceof Role)) {
      if (method === 'create' || method === 'update' || method === 'patch') {
        newData.name = Helper.validateString(oldData, 'name', Role.Errors);
        newData.icon = Helper.validateString(oldData, 'icon', Role.Errors);
        newData.permissionLevel = Helper.validateNumber(
          oldData,
          'permissionLevel',
          Role.Errors
        );

        context.data = newData;
      }
    }

    return context;
  };
};

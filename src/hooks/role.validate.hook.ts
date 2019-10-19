// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Role, RoleModel } from '../classes/role.class';
import * as Validator from 'validator';
import { BadRequest } from '@feathersjs/errors';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    let newData: any = {};

    if (method === 'create' || method === 'update') {
      if (Validator.isEmpty(oldData.name))
        throw new BadRequest(Role.Errors.InvalidName);
      newData.name = oldData.name;

      if (Validator.isEmpty(oldData.icon))
        throw new BadRequest(Role.Errors.InvalidIcon);
      newData.icon = oldData.icon;

      if (typeof oldData.permissionLevel !== 'number')
        throw new BadRequest(Role.Errors.InvalidPermissionLevel);
      newData.permissionLevel = oldData.permissionLevel;
    } else if (method === 'patch') {
      if (oldData.name !== undefined) {
        if (Validator.isEmpty(oldData.name))
          throw new BadRequest(Role.Errors.InvalidName);
        newData.name = oldData.name;
      }

      if (oldData.icon !== undefined) {
        if (Validator.isEmpty(oldData.icon))
          throw new BadRequest(Role.Errors.InvalidIcon);
        newData.icon = oldData.icon;
      }

      if (oldData.permissionLevel !== undefined) {
        if (typeof oldData.permissionLevel !== 'number')
          throw new BadRequest(Role.Errors.InvalidPermissionLevel);
        newData.permissionLevel = oldData.permissionLevel;
      }
    }

    return context;
  };
};

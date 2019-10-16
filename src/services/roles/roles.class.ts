import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Role } from '../../classes/role.class';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

export class Roles extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('users');
    });
  }

  async patch(id: NullableId, role: Role, params?: Params) {}

  async get(id: Id, params?: Params): Promise<Role> {
    let datas: any = await super._get(id, params);

    let returnRole = Role.initFromDatas(datas);

    return returnRole;
  }

  async find(params?: Params): Promise<Role[]> {
    let datas: any = await super._find(params);
    let returnRoles: Role[] = [];

    for (const foundValue of datas) {
      returnRoles.push(Role.initFromDatas(foundValue));
    }

    return returnRoles;
  }

  async getUserRole(): Promise<Role> {
    let userRole: Role[] = await this.find({ name: 'user' });
    try {
      return userRole[0];
    } catch (error) {
      throw new BadRequest(Role.Errors.UserRoleNotCreated);
    }
  }
}

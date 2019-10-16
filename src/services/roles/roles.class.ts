import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Role, RoleModel } from '../../classes/role.class';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

export class Roles extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('roles');
    });
  }

  async remove(id: NullableId, params: Params): Promise<Role> {
    let returnRole = Role.fromDatas(await super._remove(id, params));

    return returnRole;
  }

  async create(datas: RoleModel, params?: Params) {
    await super._create(datas, params);
    let returnRole = Role.fromDatas(await super.create(datas, params));

    return returnRole;
  }

  async update(id: NullableId, role: Role, params?: Params): Promise<Role> {
    let returnRole = Role.fromDatas(
      await super._update(id, Role.toDatas(role), params)
    );

    return returnRole;
  }

  async patch(id: NullableId, role: Role, params?: Params): Promise<Role> {
    let returnRole = Role.fromDatas(
      await super._patch(id, Role.toDatas(role), params)
    );

    return returnRole;
  }

  async get(id: Id, params?: Params): Promise<Role> {
    let datas: any = await super._get(id, params);

    let returnRole = Role.fromDatas(datas);

    return returnRole;
  }

  async find(params?: Params): Promise<Role[]> {
    let datasList: any = await super._find(params);
    let returnRoles: Role[] = [];

    for (const datas of datasList) {
      returnRoles.push(Role.fromDatas(datas));
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

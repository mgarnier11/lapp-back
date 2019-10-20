import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Role, RoleModel } from '../../classes/role.class';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import app from '../../app';
import { EventEmitter } from 'events';

export class RoleServiceClass extends Service {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('roles');

      this.evtEmt.emit('ready');
    });
  }

  async remove(id: NullableId, params?: Params): Promise<Role> {
    let retValue = await Role.fromDatas(await this._remove(id, params));

    return retValue;
  }

  async create(role: Role, params?: Params): Promise<Role> {
    let retValue = await Role.fromDatas(
      await this._create(await Role.toDatas(role), params)
    );

    return retValue;
  }

  async get(id: Id, params?: Params): Promise<Role> {
    let retValue = await Role.fromDatas(await this._get(id, params));

    return retValue;
  }

  async find(params?: Params): Promise<Role[]> {
    let datasList: any = await this._find(params);
    let retValue: Role[] = [];

    for (const datas of datasList) {
      retValue.push(await Role.fromDatas(datas));
    }

    return retValue;
  }

  async update(id: NullableId, role: Role, params?: Params): Promise<Role> {
    let retValue = await Role.fromDatas(
      await this._update(id, await Role.toDatas(role), params)
    );

    return retValue;
  }

  async patch(id: NullableId, role: Role, params?: Params): Promise<Role> {
    let retValue = await Role.fromDatas(
      await this._patch(id, await Role.toDatas(role), params)
    );

    return retValue;
  }

  async getUserRole(): Promise<Role> {
    let roles: Role[] = await this.find({ query: { name: 'user' } });
    try {
      return roles[0];
    } catch (error) {
      throw new BadRequest(Role.Errors.UserRoleNotCreated);
    }
  }
}

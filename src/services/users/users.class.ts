import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { User, UserModel } from '../../classes/user.class';
import { Params, NullableId, Id } from '@feathersjs/feathers';
import app from '../../app';
import { Role } from '../../classes/role.class';
import { EventEmitter } from 'events';

export class UserServiceClass extends Service {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('users');
    });
  }

  async remove(id: NullableId, params?: Params): Promise<User> {
    let retValue = await User.fromDatas(await this._remove(id, params));

    return retValue;
  }

  async create(user: User, params?: Params): Promise<User> {
    let retValue = await User.fromDatas(
      await this._create(await User.toDatas(user), params)
    );

    return retValue;
  }

  async get(id: Id, params?: Params): Promise<User> {
    let retValue = await User.fromDatas(await this._get(id, params));

    return retValue;
  }

  async find(params?: Params): Promise<User[]> {
    let datasList: any = await this._find(params);
    let retValue: User[] = [];

    for (const datas of datasList) {
      retValue.push(await User.fromDatas(datas));
    }

    return retValue;
  }

  async update(id: NullableId, user: User, params?: Params): Promise<User> {
    let retValue = await User.fromDatas(
      await this._update(id, await User.toDatas(user), params)
    );

    return retValue;
  }

  async patch(id: NullableId, user: User, params?: Params): Promise<User> {
    let retValue = await User.fromDatas(
      await this._patch(id, await User.toDatas(user), params)
    );

    return retValue;
  }
}

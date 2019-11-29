import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { User, UserModel } from "../../classes/user.class";
import { Params, NullableId, Id } from "@feathersjs/feathers";
import app from "../../app";
import { Role } from "../../classes/role.class";
import { EventEmitter } from "events";

export class UserServiceClass extends Service<User> {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("users");
    });
  }

  async remove(id: NullableId, params?: Params): Promise<User> {
    let dbUser = await this._remove(id, params);

    return User.fromDbToClass(dbUser);
  }

  async create(datas: any, params?: Params): Promise<User> {
    let dbUser = await this._create(datas, params);

    return User.fromDbToClass(dbUser);
  }

  async get(id: Id, params?: Params): Promise<User> {
    let dbUser = await this._get(id, params);

    return User.fromDbToClass(dbUser);
  }

  async find(params?: Params): Promise<User[]> {
    let dbUsers: any = await this._find(params);
    let users: User[] = [];

    for (const dbUser of dbUsers) {
      users.push(await User.fromDbToClass(dbUser));
    }

    return users;
  }

  async update(id: NullableId, datas: any, params?: Params): Promise<User> {
    let dbUser = await this._update(id, datas, params);

    return User.fromDbToClass(dbUser);
  }

  async patch(id: NullableId, datas: any, params?: Params): Promise<User> {
    let dbUser = this._patch(id, datas, params);

    return User.fromDbToClass(dbUser);
  }
}

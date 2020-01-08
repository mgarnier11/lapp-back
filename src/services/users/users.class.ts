import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { User, UserModel } from "../../classes/user.class";
import { Params, NullableId, Id } from "@feathersjs/feathers";
import app from "../../app";
import { Role } from "../../classes/role.class";
import { EventEmitter } from "events";
import { BadRequest } from "@feathersjs/errors";

export const idViceName = "idViceN";

export class UserServiceClass extends Service<User> {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("users");

      this.evtEmt.emit("ready");
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
    throw new BadRequest("Update method is not implemented");

    let dbUser = await this._update(id, datas, params);

    return User.fromDbToClass(dbUser);
  }

  async patch(id: NullableId, datas: any, params?: Params): Promise<User> {
    let dbUser = await this._patch(id, datas, params);

    return User.fromDbToClass(dbUser);
  }

  isEmailPresent(email: string): Promise<boolean> {
    return new Promise((res, rej) => {
      app.services.users
        .find({ query: { email } })
        .then(foundUsers => {
          if (foundUsers.length > 0) res(true);
          else res(false);
        })
        .catch(error => rej(error));
    });
  }

  isNamePresent(name): Promise<boolean> {
    return new Promise((res, rej) => {
      app.services.users
        .find({ query: { name } })
        .then(foundUsers => {
          if (foundUsers.length > 0) res(true);
          else res(false);
        })
        .catch(error => rej(error));
    });
  }

  getNextIDViceName(): Promise<string> {
    return new Promise((res, rej) => {
      app.services.users
        .find({ query: { name: { $search: `${idViceName}\\d+$` } } })
        .then(foundUsers => {
          res(idViceName + foundUsers.length);
        });
    });
  }
}

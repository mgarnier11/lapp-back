import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { Role, RoleModel } from "../../classes/role.class";
import { Params, Id, NullableId } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import app from "../../app";
import { EventEmitter } from "events";

export class RoleServiceClass extends Service<Role> {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("roles");

      this.evtEmt.emit("ready");
    });
  }

  async remove(id: NullableId, params?: Params): Promise<Role> {
    let dbRole = await this._remove(id, params);

    return Role.fromDbToClass(dbRole);
  }

  async create(datas: any, params?: Params): Promise<Role> {
    let dbRole = await this._create(datas, params);

    return Role.fromDbToClass(dbRole);
  }

  async get(id: Id, params?: Params): Promise<Role> {
    let dbRole = await this._get(id, params);

    return Role.fromDbToClass(dbRole);
  }

  async find(params?: Params): Promise<Role[]> {
    let dbRoles: any = await this._find(params);
    let roles: Role[] = [];

    for (const dbRole of dbRoles) {
      roles.push(await Role.fromDbToClass(dbRole));
    }

    return roles;
  }

  async update(id: NullableId, datas: any, params?: Params): Promise<Role> {
    let dbRole = await this._update(id, datas, params);

    return Role.fromDbToClass(dbRole);
  }

  async patch(id: NullableId, datas: any, params?: Params): Promise<Role> {
    let dbRole = this._patch(id, datas, params);

    return Role.fromDbToClass(dbRole);
  }

  async getUserRole(): Promise<Role> {
    let roles: Role[] = await this.find({ query: { name: "user" } });
    try {
      return roles[0];
    } catch (error) {
      throw new BadRequest(Role.Errors.UserRoleNotCreated);
    }
  }
}

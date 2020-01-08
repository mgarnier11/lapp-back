import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { Role, RoleModel } from "../../classes/role.class";
import { Params, Id, NullableId } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import app from "../../app";
import { EventEmitter } from "events";

let userRole = Role.New({
  name: "user",
  icon: "",
  permissionLevel: 0
});

export class RoleServiceClass extends Service<Role> {
  public evtEmt: EventEmitter = new EventEmitter();
  public static isLoaded: boolean = false;

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("roles");

      this.evtEmt.emit("ready");

      RoleServiceClass.isLoaded = true;
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
    throw new BadRequest("Update method is not implemented");

    let dbRole = await this._update(id, datas, params);

    return Role.fromDbToClass(dbRole);
  }

  async patch(id: NullableId, datas: any, params?: Params): Promise<Role> {
    let dbRole = await this._patch(id, datas, params);

    return Role.fromDbToClass(dbRole);
  }

  public getUserRole(): Promise<Role> {
    return new Promise((res, rej) => {
      const roleServiceReady = () => {
        this.find({ query: { name: userRole.name } }).then(async foundRoles => {
          try {
            userRole =
              foundRoles.length === 0
                ? await this.create(userRole)
                : foundRoles[0];
            res(userRole);
          } catch (error) {
            rej(error);
          }
        });
      };

      if (!RoleServiceClass.isLoaded)
        this.evtEmt.once("ready", roleServiceReady);
      else roleServiceReady();
    });
  }
}

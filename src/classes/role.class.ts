import { NullableId } from "@feathersjs/feathers";

export interface RoleModel {
  _id: NullableId;
  name: string;
  icon: string;
  permissionLevel: number;
}

enum RoleErrors {
  NotFound = "Role Not Found",
  name = "Invalid Name",
  icon = "Invalid Icon",
  permissionLevel = "Invalid PermissionLevel",
  UserRoleNotCreated = "User role not created",
  UsersAssigned = "Users are assigned to this role"
}

export class Role {
  static readonly Errors = RoleErrors;

  private _id: NullableId = null;
  public get id(): NullableId {
    return this._id;
  }
  public set id(value: NullableId) {
    this._id = value;
  }

  private _name: string = "";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  private _icon: string = "";
  public get icon(): string {
    return this._icon;
  }
  public set icon(value: string) {
    this._icon = value;
  }

  private _permissionLevel: number = 0;
  public get permissionLevel(): number {
    return this._permissionLevel;
  }
  public set permissionLevel(value: number) {
    this._permissionLevel = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<Role>): Role {
    return Object.assign(new Role(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<Role> {
    let r = new Role();

    r.id = datas._id;
    r.name = datas.name;
    r.icon = datas.icon;
    r.permissionLevel = datas.permissionLevel;

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<RoleModel> {
    let dbDatas: Partial<RoleModel> = {
      icon: datas.icon,
      name: datas.name,
      permissionLevel: datas.permissionLevel
    };

    return dbDatas;
  }
}

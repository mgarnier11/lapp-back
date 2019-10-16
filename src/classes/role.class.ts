import { ObjectId } from 'mongodb';

export interface RoleModel {
  id: ObjectId;
  name: string;
  iconUrl: string;
  permissionLevel: number;
}

enum RoleErrors {
  NotFound = 'Role Not Found',
  UserRoleNotCreated = 'User role not created'
}

export class Role {
  static readonly Errors = RoleErrors;

  private _id: ObjectId = new ObjectId();
  public get id(): ObjectId {
    return this._id;
  }
  public set id(value: ObjectId) {
    this._id = value;
  }

  private _name: string = '';
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  private _iconUrl: string = '';
  public get iconUrl(): string {
    return this._iconUrl;
  }
  public set iconUrl(value: string) {
    this._iconUrl = value;
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

  public static initFromDatas(datas: any): Role {
    let r = new Role();

    r.id = datas._id;
    r.name = datas.name;
    r.iconUrl = datas.iconUrl;
    r.permissionLevel = datas.permissionLevel;

    return r;
  }
}

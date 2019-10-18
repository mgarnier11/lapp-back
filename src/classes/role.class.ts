import { NullableId, HookContext } from '@feathersjs/feathers';
import { plainToClass } from 'class-transformer';

export interface RoleModel {
  _id: NullableId;
  name: string;
  icon: string;
  permissionLevel: number;
}

enum RoleErrors {
  NotFound = 'Role Not Found',
  InvalidName = 'Invalid Name',
  InvalidIcon = 'Invalid Icon',
  InvalidPermissionLevel = 'Invalid PermissionLevel',
  UserRoleNotCreated = 'User role not created'
}

export class Role {
  static readonly Errors = RoleErrors;

  private __id: NullableId = null;
  public get id(): NullableId {
    return this.__id;
  }
  public set id(value: NullableId) {
    this.__id = value;
  }

  private __name: string = '';
  public get name(): string {
    return this.__name;
  }
  public set name(value: string) {
    this.__name = value;
  }

  private __icon: string = '';
  public get icon(): string {
    return this.__icon;
  }
  public set icon(value: string) {
    this.__icon = value;
  }

  private __permissionLevel: number = 0;
  public get permissionLevel(): number {
    return this.__permissionLevel;
  }
  public set permissionLevel(value: number) {
    this.__permissionLevel = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<Role>): Role {
    return Object.assign({}, new Role(), datas);
  }

  public static async fromDatas(datas: RoleModel): Promise<Role> {
    let r = new Role();

    r.id = datas._id;
    r.name = datas.name;
    r.icon = datas.icon;
    r.permissionLevel = datas.permissionLevel;

    return r;
  }

  public static async toDatas(role: Role): Promise<RoleModel> {
    return {
      _id: role.id,
      icon: role.icon,
      name: role.name,
      permissionLevel: role.permissionLevel
    };
  }
}

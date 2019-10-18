import { Role } from './role.class';
import { NullableId, Id } from '@feathersjs/feathers';
import app from '../app';

export interface UserModel {
  _id: NullableId;
  name: string;
  email: string;
  password: string;
  roleId: NullableId;
  gender: number;
}

export class User {
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

  private __email: string = '';
  public get email(): string {
    return this.__email;
  }
  public set email(value: string) {
    this.__email = value;
  }

  private __password: string = '';
  public get password(): string {
    return this.__password;
  }
  public set password(value: string) {
    this.__password = value;
  }

  private __role: Role = new Role();
  public get role(): Role {
    return this.__role;
  }
  public set role(value: Role) {
    this.__role = value;
  }

  private __gender: number = 0;
  public get gender(): number {
    return this.__gender;
  }
  public set gender(value: number) {
    this.__gender = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<User>): User {
    return Object.assign({}, new User(), datas);
  }

  public static async fromDatas(datas: UserModel): Promise<User> {
    let r = new User();

    r.id = datas._id;
    r.name = datas.name;
    r.email = datas.email;
    r.gender = datas.gender;
    r.password = datas.password;
    r.role = await app.services.roles.get(datas.roleId as Id);

    return r;
  }

  public static async toDatas(user: User): Promise<UserModel> {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      password: user.password,
      roleId: user.role.id
    };
  }
}

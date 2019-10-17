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
  private _id: NullableId = null;
  public get id(): NullableId {
    return this._id;
  }
  public set id(value: NullableId) {
    this._id = value;
  }

  private _name: string = '';
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  private _email: string = '';
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  private _password: string = '';
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  private _role: Role = new Role();
  public get role(): Role {
    return this._role;
  }
  public set role(value: Role) {
    this._role = value;
  }

  private _gender: number = 0;
  public get gender(): number {
    return this._gender;
  }
  public set gender(value: number) {
    this._gender = value;
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

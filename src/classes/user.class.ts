import { Role } from "./role.class";
import { NullableId, Id } from "@feathersjs/feathers";
import app from "../app";

export interface UserModel {
  _id: NullableId;
  name: string;
  email: string;
  password: string;
  roleId: NullableId;
  gender: number;
}

enum UserErrors {
  NotFound = "User Not Found",
  name = "Invalid Name",
  email = "Invalid Email",
  password = "Invalid Password",
  role = "Invalid Role",
  roleId = "Invalid RoleId",
  gender = "Invalid Gender"
}

export class User {
  static readonly Errors = UserErrors;

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

  private _email: string = "";
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  private _password: string = "";
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

  /*
  public toJSON(): object {
    return JSON.parse(JSON.stringify(this));
  }
  */

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<User>): User {
    return Object.assign(new User(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<User> {
    let r = new User();

    r.id = datas._id;
    r.name = datas.name;
    r.email = datas.email;
    r.gender = datas.gender;
    r.password = datas.password;
    try {
      r.role = await app.services["roles"].get(datas.roleId as Id);
    } catch (error) {
      if (error.code === 404) r.role = new Role();
      else throw error;
    }
    return r;
  }

  public static fromFrontToDb(datas: any): Partial<UserModel> {
    let dbDatas: Partial<UserModel> = {
      name: datas.name,
      email: datas.email,
      password: datas.password,
      gender: datas.gender
    };

    if (datas.role) dbDatas.roleId = datas.role.id;
    else if (datas.roleId) dbDatas.roleId = datas.roleId;

    return dbDatas;
  }
}

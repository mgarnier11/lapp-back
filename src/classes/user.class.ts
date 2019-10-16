import { ObjectId } from 'mongodb';
import { Role } from './role.class';

export interface UserModel {
  id?: ObjectId;
  name: string;
  email: string;
  password: string;
  roleId: ObjectId;
  gender: number;
}

export class User {
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
}

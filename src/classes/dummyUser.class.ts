export interface DummyUserModel {
  id: string;
  name: string;
  gender: number;
}

export class DummyUser {
  private _id: string = "";
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  private _name: string = "";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
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

  public static New(datas: Partial<DummyUser>): DummyUser {
    return Object.assign(new DummyUser(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<DummyUser> {
    let r = new DummyUser();

    r.id = datas.id;
    r.name = datas.name;
    r.gender = datas.gender;

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<DummyUserModel> {
    let dbDatas: Partial<DummyUserModel> = {
      id: datas.id,
      name: datas.name,
      gender: datas.gender
    };

    return dbDatas;
  }
}

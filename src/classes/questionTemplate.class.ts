import { NullableId } from "@feathersjs/feathers";

export interface QuestionTemplateModel {
  _id: NullableId;
  name: string;
  clientPath: string;
}

enum QuestionTemplateErrors {
  NotFound = "QuestionTemplate Not Found",
  name = "Invalid Name",
  clientPath = "Invalid Client Path",
  TypesAssigned = "Question types are assigned to this template"
}

export class QuestionTemplate {
  static readonly Errors = QuestionTemplateErrors;

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

  private _clientPath: string = "";
  public get clientPath(): string {
    return this._clientPath;
  }
  public set clientPath(value: string) {
    this._clientPath = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<QuestionTemplate>): QuestionTemplate {
    return Object.assign(new QuestionTemplate(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<QuestionTemplate> {
    let r = new QuestionTemplate();

    r.id = datas._id;
    r.name = datas.name;
    r.clientPath = datas.clientPath;

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<QuestionTemplateModel> {
    let dbDatas: Partial<QuestionTemplateModel> = {
      name: datas.name,
      clientPath: datas.clientPath
    };

    return dbDatas;
  }
}

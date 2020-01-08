import { NullableId } from "@feathersjs/feathers";

export interface QuestionTypeModel {
  _id: NullableId;
  name: string;
}

enum QuestionTypeErrors {
  NotFound = "QuestionType Not Found",
  name = "Invalid Name",
  QuestionsAssigned = "Questions are assigned to this type"
}

export class QuestionType {
  static readonly Errors = QuestionTypeErrors;

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

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<QuestionType>): QuestionType {
    return Object.assign(new QuestionType(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<QuestionType> {
    let r = new QuestionType();

    r.id = datas._id;
    r.name = datas.name;

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<QuestionTypeModel> {
    let dbDatas: Partial<QuestionTypeModel> = {
      name: datas.name
    };

    return dbDatas;
  }
}

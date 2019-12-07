import { NullableId, Id } from "@feathersjs/feathers";
import app from "../app";
import { QuestionType } from "./questionType.class";
import { User } from "./user.class";

export interface QuestionModel {
  _id: NullableId;
  typeId: NullableId;
  text: string;
  difficulty: number;
  hotLevel: number;
  creatorId: NullableId;
}

enum QuestionErrors {
  NotFound = "Question Not Found",
  text = "Invalid Text",
  difficulty = "Invalid Difficulty",
  hotLevel = "Invalid HotLevel",
  type = "Invalid Type",
  typeId = "Invalid TypeId"
}

export class Question {
  static readonly Errors = QuestionErrors;

  private _id: NullableId = null;
  public get id(): NullableId {
    return this._id;
  }
  public set id(value: NullableId) {
    this._id = value;
  }

  private _type: QuestionType = new QuestionType();
  public get type(): QuestionType {
    return this._type;
  }
  public set type(value: QuestionType) {
    this._type = value;
  }

  private _text: string = "";
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
  }

  private _difficulty: number = 0;
  public get difficulty(): number {
    return this._difficulty;
  }
  public set difficulty(value: number) {
    this._difficulty = value;
  }

  private _hotLevel: number = 0;
  public get hotLevel(): number {
    return this._hotLevel;
  }
  public set hotLevel(value: number) {
    this._hotLevel = value;
  }

  private _creator: User = new User();
  public get creator(): User {
    return this._creator;
  }
  public set creator(value: User) {
    this._creator = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<Question>): Question {
    return Object.assign(new Question(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<Question> {
    let r = new Question();

    r.id = datas._id;
    try {
      r.type = await app.services["question-types"].get(datas.typeId as Id);
    } catch (error) {
      if (error.code === 404) r.type = new QuestionType();
      else throw error;
    }
    r.text = datas.text;
    r.difficulty = datas.difficulty;
    r.hotLevel = datas.hotLevel;
    try {
      r.creator = await app.services["users"].get(datas.creatorId as Id);
    } catch (error) {
      if (error.code === 404) r.creator = new User();
      else throw error;
    }

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<QuestionModel> {
    let dbDatas: Partial<QuestionModel> = {
      difficulty: datas.difficulty,
      hotLevel: datas.hotLevel,
      text: datas.text
    };

    if (datas.type) dbDatas.typeId = datas.type.id;
    else if (datas.typeId) dbDatas.typeId = datas.typeId;

    return dbDatas;
  }
}

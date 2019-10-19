import { NullableId, Id } from '@feathersjs/feathers';
import app from '../app';
import { QuestionType } from './questionType.class';

export interface QuestionModel {
  _id: NullableId;
  typeId: NullableId;
  text: string;
  difficulty: number;
  hotLevel: number;
}

export class Question {
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

  private _text: string = '';
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

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<Question>): Question {
    return Object.assign({}, new Question(), datas);
  }

  public static async fromDatas(datas: QuestionModel): Promise<Question> {
    let r = new Question();

    r.id = datas._id;
    r.type = await app.services['question-types'].get(datas.typeId as Id);
    r.text = datas.text;
    r.difficulty = datas.difficulty;
    r.hotLevel = datas.hotLevel;

    return r;
  }

  public static async toDatas(question: Question): Promise<QuestionModel> {
    return {
      _id: question.id,
      typeId: question.type.id,
      text: question.text,
      difficulty: question.difficulty,
      hotLevel: question.hotLevel
    };
  }
}

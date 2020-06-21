import { NullableId } from "@feathersjs/feathers";
import { User } from "./user.class";

export interface ScoreModel {
  score: number;
  userId: string;
}

export class Score {
  private _score: number = 0;
  public get score(): number {
    return this._score;
  }
  public set score(value: number) {
    this._score = value;
  }

  private _userId: string = "";
  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<Score>): Score {
    return Object.assign(new Score(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<Score> {
    let r = new Score();

    r.score = datas.score;
    r.userId = datas.userId;

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<ScoreModel> {
    let dbDatas: Partial<ScoreModel> = {
      score: datas.score,
      userId: datas.userId,
    };

    return dbDatas;
  }
}

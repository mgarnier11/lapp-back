import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { NullableId, Params, Id } from "@feathersjs/feathers";
import { QuestionType } from "../../classes/questionType.class";
import { EventEmitter } from "events";

export class QuestionTypeServiceClass extends Service {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("question-types");

      this.evtEmt.emit("ready");
    });
  }
  async remove(id: NullableId, params?: Params): Promise<QuestionType> {
    let dbQuestionType = await this._remove(id, params);

    return QuestionType.fromDbToClass(dbQuestionType);
  }

  async create(datas: any, params?: Params): Promise<QuestionType> {
    let dbQuestionType = await this._create(datas, params);

    return QuestionType.fromDbToClass(dbQuestionType);
  }

  async get(id: Id, params?: Params): Promise<QuestionType> {
    let dbQuestionType = await this._get(id, params);

    return QuestionType.fromDbToClass(dbQuestionType);
  }

  async find(params?: Params): Promise<QuestionType[]> {
    let dbQuestionTypes: any = await this._find(params);
    let questionTypes: QuestionType[] = [];

    for (const dbQuestionType of dbQuestionTypes) {
      questionTypes.push(await QuestionType.fromDbToClass(dbQuestionType));
    }

    return questionTypes;
  }

  async update(
    id: NullableId,
    datas: any,
    params?: Params
  ): Promise<QuestionType> {
    let dbQuestionType = this._update(id, datas, params);

    return QuestionType.fromDbToClass(dbQuestionType);
  }

  async patch(
    id: NullableId,
    datas: any,
    params?: Params
  ): Promise<QuestionType> {
    let dbQuestionType = this._patch(id, datas, params);

    return QuestionType.fromDbToClass(dbQuestionType);
  }
}

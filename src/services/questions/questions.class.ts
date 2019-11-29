import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { NullableId, Params, Id } from "@feathersjs/feathers";
import { Question } from "../../classes/question.class";
import { EventEmitter } from "events";

export class QuestionServiceClass extends Service<Question> {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("questions");

      this.evtEmt.emit("ready");
    });
  }

  async remove(id: NullableId, params?: Params): Promise<Question> {
    let dbQuestion = await this._remove(id, params);

    return Question.fromDbToClass(dbQuestion);
  }

  async create(datas: any, params?: Params): Promise<Question> {
    let dbQuestion = await this._create(datas, params);

    return Question.fromDbToClass(dbQuestion);
  }

  async get(id: Id, params?: Params): Promise<Question> {
    let dbQuestion = await this._get(id, params);

    return Question.fromDbToClass(dbQuestion);
  }

  async find(params?: Params): Promise<Question[]> {
    let dbQuestions: any = await this._find(params);
    let questions: Question[] = [];

    for (const dbQuestion of dbQuestions) {
      questions.push(await Question.fromDbToClass(dbQuestion));
    }

    return questions;
  }

  async update(id: NullableId, datas: any, params?: Params): Promise<Question> {
    let dbQuestion = await this._update(id, datas, params);

    return Question.fromDbToClass(dbQuestion);
  }

  async patch(id: NullableId, datas: any, params?: Params): Promise<Question> {
    let dbQuestion = this._patch(id, datas, params);

    return Question.fromDbToClass(dbQuestion);
  }
}

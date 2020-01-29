import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { NullableId, Params, Id } from "@feathersjs/feathers";
import { QuestionTemplate } from "../../classes/questionTemplate.class";
import { EventEmitter } from "events";
import { BadRequest } from "@feathersjs/errors";

export class QuestionTemplateServiceClass extends Service<QuestionTemplate> {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("question-templates");

      this.evtEmt.emit("ready");
    });
  }
  async remove(id: NullableId, params?: Params): Promise<QuestionTemplate> {
    let dbQuestionTemplate = await this._remove(id, params);

    return QuestionTemplate.fromDbToClass(dbQuestionTemplate);
  }

  async create(datas: any, params?: Params): Promise<QuestionTemplate> {
    let dbQuestionTemplate = await this._create(datas, params);

    return QuestionTemplate.fromDbToClass(dbQuestionTemplate);
  }

  async get(id: Id, params?: Params): Promise<QuestionTemplate> {
    let dbQuestionTemplate = await this._get(id, params);

    return QuestionTemplate.fromDbToClass(dbQuestionTemplate);
  }

  async find(params?: Params): Promise<QuestionTemplate[]> {
    let dbQuestionTemplates: any = await this._find(params);
    let questionTemplates: QuestionTemplate[] = [];

    for (const dbQuestionTemplate of dbQuestionTemplates) {
      questionTemplates.push(
        await QuestionTemplate.fromDbToClass(dbQuestionTemplate)
      );
    }

    return questionTemplates;
  }

  async update(
    id: NullableId,
    datas: any,
    params?: Params
  ): Promise<QuestionTemplate> {
    throw new BadRequest("Update method is not implemented");
    let dbQuestionTemplate = await this._update(id, datas, params);

    return QuestionTemplate.fromDbToClass(dbQuestionTemplate);
  }

  async patch(
    id: NullableId,
    datas: any,
    params?: Params
  ): Promise<QuestionTemplate> {
    let dbQuestionTemplate = await this._patch(id, datas, params);

    return QuestionTemplate.fromDbToClass(dbQuestionTemplate);
  }
}

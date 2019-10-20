import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { NullableId, Params, Id } from '@feathersjs/feathers';
import { Question } from '../../classes/question.class';
import { EventEmitter } from 'events';

export class QuestionServiceClass extends Service {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('questions');

      this.evtEmt.emit('ready');
    });
  }

  async remove(id: NullableId, params?: Params): Promise<Question> {
    let retValue = await Question.fromDatas(await this._remove(id, params));

    return retValue;
  }

  async create(question: Question, params?: Params): Promise<Question> {
    let retValue = await Question.fromDatas(
      await this._create(await Question.toDatas(question), params)
    );

    return retValue;
  }

  async get(id: Id, params?: Params): Promise<Question> {
    let retValue = await Question.fromDatas(await this._get(id, params));

    return retValue;
  }

  async find(params?: Params): Promise<Question[]> {
    let datasList: any = await this._find(params);
    let retValue: Question[] = [];

    for (const datas of datasList) {
      retValue.push(await Question.fromDatas(datas));
    }

    return retValue;
  }

  async update(
    id: NullableId,
    question: Question,
    params?: Params
  ): Promise<Question> {
    let retValue = await Question.fromDatas(
      await this._update(id, await Question.toDatas(question), params)
    );

    return retValue;
  }

  async patch(
    id: NullableId,
    question: Question,
    params?: Params
  ): Promise<Question> {
    let retValue = await Question.fromDatas(
      await this._patch(id, await Question.toDatas(question), params)
    );

    return retValue;
  }
}

import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { NullableId, Params, Id } from '@feathersjs/feathers';
import { QuestionType } from '../../classes/questionType.class';
import { EventEmitter } from 'events';

export class QuestionTypeServiceClass extends Service {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('question-types');

      this.evtEmt.emit('ready');
    });
  }

  async remove(id: NullableId, params?: Params): Promise<QuestionType> {
    let retValue = await QuestionType.fromDatas(await this._remove(id, params));

    return retValue;
  }

  async create(
    questionType: QuestionType,
    params?: Params
  ): Promise<QuestionType> {
    let retValue = await QuestionType.fromDatas(
      await this._create(await QuestionType.toDatas(questionType), params)
    );

    return retValue;
  }

  async get(id: Id, params?: Params): Promise<QuestionType> {
    let retValue = await QuestionType.fromDatas(await this._get(id, params));

    return retValue;
  }

  async find(params?: Params): Promise<QuestionType[]> {
    let datasList: any = await this._find(params);
    let retValue: QuestionType[] = [];

    for (const datas of datasList) {
      retValue.push(await QuestionType.fromDatas(datas));
    }

    return retValue;
  }

  async update(
    id: NullableId,
    questionType: QuestionType,
    params?: Params
  ): Promise<QuestionType> {
    let retValue = await QuestionType.fromDatas(
      await this._update(id, await QuestionType.toDatas(questionType), params)
    );

    return retValue;
  }

  async patch(
    id: NullableId,
    questionType: QuestionType,
    params?: Params
  ): Promise<QuestionType> {
    let retValue = await QuestionType.fromDatas(
      await this._patch(id, await QuestionType.toDatas(questionType), params)
    );

    return retValue;
  }
}

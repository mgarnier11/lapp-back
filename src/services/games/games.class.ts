import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { NullableId, Params, Id } from '@feathersjs/feathers';
import { Game } from '../../classes/game.class';

export class Games extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('users');
    });
  }

  async remove(id: NullableId, params?: Params): Promise<Game> {
    let retValue = await Game.fromDatas(await this._remove(id, params));

    return retValue;
  }

  async create(game: Game, params?: Params): Promise<Game> {
    let retValue = await Game.fromDatas(
      await this._create(await Game.toDatas(game), params)
    );

    return retValue;
  }

  async get(id: Id, params?: Params) {
    let retValue = await Game.fromDatas(await this._get(id, params));

    return retValue;
  }

  async find(params?: Params): Promise<Game[]> {
    let datasList: any = await this._find(params);
    let retValue: Game[] = [];

    for (const datas of datasList) {
      retValue.push(await Game.fromDatas(datas));
    }

    return retValue;
  }

  async update(id: NullableId, game: Game, params?: Params): Promise<Game> {
    let retValue = await Game.fromDatas(
      await this._update(id, await Game.toDatas(game), params)
    );

    return retValue;
  }

  async patch(id: NullableId, game: Game, params?: Params): Promise<Game> {
    let retValue = await Game.fromDatas(
      await this._patch(id, await Game.toDatas(game), params)
    );

    return retValue;
  }
}

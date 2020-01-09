import { Db } from "mongodb";
import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Application } from "../../declarations";
import { NullableId, Params, Id } from "@feathersjs/feathers";
import { Game } from "../../classes/game.class";
import { EventEmitter } from "events";
import { BadRequest } from "@feathersjs/errors";

export class GameServiceClass extends Service<Game> {
  public evtEmt: EventEmitter = new EventEmitter();

  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get("mongoClient");

    client.then(db => {
      this.Model = db.collection("games");

      this.evtEmt.emit("ready");
    });
  }

  async remove(id: NullableId, params?: Params): Promise<Game> {
    let dbGame = await this._remove(id, params);

    return Game.fromDbToClass(dbGame);
  }

  async create(datas: any, params?: Params): Promise<Game> {
    let dbGame = await this._create(datas, params);

    return Game.fromDbToClass(dbGame);
  }

  async get(id: Id, params?: Params): Promise<Game> {
    let dbGame = await this._get(id, params);

    return Game.fromDbToClass(dbGame);
  }

  async find(params?: Params): Promise<Game[]> {
    let dbGames: any = await this._find(params);
    let games: Game[] = [];

    for (const dbGame of dbGames) {
      games.push(await Game.fromDbToClass(dbGame));
    }

    return games;
  }

  async update(id: NullableId, datas: any, params?: Params): Promise<Game> {
    throw new BadRequest("Update method is not implemented");
    let dbGame = await this._update(id, datas, params);

    return Game.fromDbToClass(dbGame);
  }

  async patch(id: NullableId, datas: any, params?: Params): Promise<Game> {
    let dbGame = await this._patch(id, datas, params);

    return Game.fromDbToClass(dbGame);
  }
}

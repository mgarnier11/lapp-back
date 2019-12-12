import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods
} from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { GameType, gameTypes } from "../../classes/gameType.class";
import { BadRequest } from "@feathersjs/errors";

interface Data {}

interface ServiceOptions {}

export class GameTypes implements ServiceMethods<GameType> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(): Promise<GameType[]> {
    return gameTypes;
  }

  async get(id: string): Promise<GameType> {
    return gameTypes.find(g => g.id === parseInt(id))!;
  }

  async create(data: Partial<GameType>): Promise<GameType> {
    throw new BadRequest("not implemented");
    return new GameType();
  }

  async update(id: number, data: GameType): Promise<GameType> {
    throw new BadRequest("not implemented");
    return new GameType();
  }

  async patch(id: number, data: Partial<GameType>): Promise<GameType> {
    throw new BadRequest("not implemented");
    return new GameType();
  }

  async remove(id: number): Promise<GameType> {
    throw new BadRequest("not implemented");
    return new GameType();
  }
}

import { NullableId, Id } from '@feathersjs/feathers';
import app from '../app';
import { QuestionType } from './questionType.class';
import { User } from './user.class';

export interface GameModel {
  _id: NullableId;
  displayId: string;
  name: string;
  userIds: NullableId[];
  nbTurns: number;
  actualTurn: number;
  questionTypesIds: NullableId[];
  maxDifficulty: number;
  maxHotLevel: number;
  creatorId: NullableId;
}

export class Game {
  private _id: NullableId = null;
  public get id(): NullableId {
    return this._id;
  }
  public set id(value: NullableId) {
    this._id = value;
  }

  private _displayId: string = '';
  public get displayId(): string {
    return this._displayId;
  }
  public set displayId(value: string) {
    this._displayId = value;
  }

  private _name: string = '';
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  private _users: User[] = [];
  public get users(): User[] {
    return this._users;
  }
  public set users(value: User[]) {
    this._users = value;
  }

  private _nbTurns: number = 0;
  public get nbTurns(): number {
    return this._nbTurns;
  }
  public set nbTurns(value: number) {
    this._nbTurns = value;
  }

  private _actualTurn: number = 0;
  public get actualTurn(): number {
    return this._actualTurn;
  }
  public set actualTurn(value: number) {
    this._actualTurn = value;
  }

  private _questionTypes: QuestionType[] = [];
  public get questionTypes(): QuestionType[] {
    return this._questionTypes;
  }
  public set questionTypes(value: QuestionType[]) {
    this._questionTypes = value;
  }

  private _maxDifficulty: number = 0;
  public get maxDifficulty(): number {
    return this._maxDifficulty;
  }
  public set maxDifficulty(value: number) {
    this._maxDifficulty = value;
  }

  private _maxHotLevel: number = 0;
  public get maxHotLevel(): number {
    return this._maxHotLevel;
  }
  public set maxHotLevel(value: number) {
    this._maxHotLevel = value;
  }

  private _creator: User = new User();
  public get creator(): User {
    return this._creator;
  }
  public set creator(value: User) {
    this._creator = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<Game>): Game {
    return Object.assign(new Game(), datas);
  }

  public static async fromDatas(datas: GameModel): Promise<Game> {
    let r = new Game();

    r.id = datas._id;
    r.displayId = datas.displayId;
    r.name = datas.name;
    r.users = await app.services['users'].find({
      query: { _id: { $in: datas.userIds } }
    });
    r.nbTurns = datas.nbTurns;
    r.actualTurn = datas.actualTurn;
    r.questionTypes = await app.services['question-types'].find({
      query: { _id: { $in: datas.questionTypesIds } }
    });
    r.maxDifficulty = datas.maxDifficulty;
    r.maxHotLevel = datas.maxHotLevel;
    try {
      r.creator = await app.services['users'].get(datas.creatorId as Id);
    } catch (error) {
      if (error.code === 404) r.creator = new User();
      else throw error;
    }

    return r;
  }

  public static async toDatas(game: Game): Promise<GameModel> {
    return {
      _id: game.id,
      displayId: game.displayId,
      name: game.name,
      userIds: game.users.map(u => u.id),
      nbTurns: game.nbTurns,
      actualTurn: game.actualTurn,
      questionTypesIds: game.questionTypes.map(qt => qt.id),
      maxDifficulty: game.maxDifficulty,
      maxHotLevel: game.maxHotLevel,
      creatorId: game.creator.id
    };
  }
}

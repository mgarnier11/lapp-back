import { NullableId, Id } from "@feathersjs/feathers";
import seedRandom from "seedrandom";

import app from "../app";
import { QuestionType } from "./questionType.class";
import { User } from "./user.class";
import { GameType } from "./gameType.class";
import { DummyUser, DummyUserModel } from "./dummyUser.class";
import { Question } from "./question.class";
import { Score, ScoreModel } from "./score.class";

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
  creationDate: Date;
  typeId: string;
  status: GameStatus;
  dummyUsers: DummyUserModel[];
  scores: ScoreModel[];
  actualQuestionId: NullableId;
}

enum GameErrors {
  NotFound = "Game Not Found",
  displayId = "Invalid DisplayId",
  name = "Invalid Name",
  nbTurns = "Invalid NbTurns",
  actualTurn = "Invalid ActualTurn",
  maxDifficulty = "Invalid MaxDifficulty",
  maxHotLevel = "Invalid MaxHotLevel",
  creator = "Invalid Creator",
  users = "Invalid Users",
  userIds = "Invalid UserIds",
  questionTypes = "Invalid QuestionTypes",
  questionTypesIds = "Invalid QuestionTypesIds",
  type = "Invalid Type",
  typeId = "Invalid TypeId",
  status = "Invalid Status",
}

export enum GameStatus {
  created = "Created",
  started = "Started",
  finished = "Finished",
}

export class Game {
  static readonly Errors = GameErrors;

  private _id: NullableId = null;
  public get id(): NullableId {
    return this._id;
  }
  public set id(value: NullableId) {
    this._id = value;
  }

  private _displayId: string = "";
  public get displayId(): string {
    return this._displayId;
  }
  public set displayId(value: string) {
    this._displayId = value;
  }

  private _name: string = "";
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

  public get allUsers(): (User | DummyUser)[] {
    return [...this._users, ...this._dummyUsers];
  }

  private _dummyUsers: DummyUser[] = [];
  public get dummyUsers(): DummyUser[] {
    return this._dummyUsers;
  }
  public set dummyUsers(value: DummyUser[]) {
    this._dummyUsers = value;
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

  private _creationDate: Date = new Date();
  public get creationDate(): Date {
    return this._creationDate;
  }
  public set creationDate(value: Date) {
    this._creationDate = value;
  }

  private _type: GameType = new GameType();
  public get type(): GameType {
    return this._type;
  }
  public set type(value: GameType) {
    this._type = value;
  }

  private _status: GameStatus = GameStatus.created;
  public get status(): GameStatus {
    return this._status;
  }
  public set status(value: GameStatus) {
    this._status = value;
  }

  private _scores: Score[] = [];
  public get scores(): Score[] {
    return this._scores;
  }
  public set scores(value: Score[]) {
    this._scores = value;
  }

  private _actualQuestion: Question = new Question();
  public get actualQuestion(): Question {
    return this._actualQuestion;
  }
  public set actualQuestion(value: Question) {
    this._actualQuestion = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<Game>): Game {
    return Object.assign(new Game(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<Game> {
    let r = new Game();

    r.id = datas._id;
    r.displayId = datas.displayId;
    r.name = datas.name;
    r.users = await app.services.users.find({
      query: { _id: { $in: datas.userIds } },
    });

    if (datas.dummyUsers)
      for (const d of datas.dummyUsers) {
        r.dummyUsers.push(await DummyUser.fromDbToClass(d));
      }

    r.nbTurns = datas.nbTurns;
    r.actualTurn = datas.actualTurn;
    r.questionTypes = await app.services["question-types"].find({
      query: { _id: { $in: datas.questionTypesIds } },
    });
    r.maxDifficulty = datas.maxDifficulty;
    r.maxHotLevel = datas.maxHotLevel;
    try {
      r.creator = await app.services["users"].get(datas.creatorId as Id);
    } catch (error) {
      if (error.code === 404) r.creator = new User();
      else throw error;
    }
    r.creationDate = datas.creationDate;

    try {
      r.type = await app.services["game-types"].get(datas.typeId as string);
    } catch (error) {
      if (error.code === 404) r.creator = new User();
      else throw error;
    }
    r.status = datas.status;

    try {
      r.actualQuestion = await app.services["questions"].get(
        (datas.actualQuestionId as string) ?? ""
      );
    } catch (error) {
      if (error.code === 404) r.actualQuestion = new Question();
      else throw error;
    }

    if (datas.scores)
      for (const s of datas.scores) {
        r.scores.push(await Score.fromDbToClass(s));
      }

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<GameModel> {
    let dbDatas: Partial<GameModel> = {
      displayId: datas.displayId,
      name: datas.name,
      nbTurns: datas.nbTurns,
      actualTurn: datas.actualTurn,
      maxDifficulty: datas.maxDifficulty,
      maxHotLevel: datas.maxHotLevel,
      status: datas.status,
    };

    if (datas.dummyUsers)
      dbDatas.dummyUsers = datas.dummyUsers.map((d) =>
        DummyUser.fromFrontToDb(d)
      );

    if (datas.users)
      dbDatas.userIds = [...new Set<NullableId>(datas.users.map((u) => u.id))];
    else if (datas.userIds)
      dbDatas.userIds = [...new Set<NullableId>(datas.userIds)];

    if (datas.questionTypes)
      dbDatas.questionTypesIds = datas.questionTypes.map((qt) => qt.id);
    else if (datas.questionTypesIds)
      dbDatas.questionTypesIds = datas.questionTypesIds;

    if (datas.type) dbDatas.typeId = datas.type.id;
    else if (datas.typeId) dbDatas.typeId = datas.typeId;

    if (datas.actualQuestion)
      dbDatas.actualQuestionId = datas.actualQuestion.id;
    else if (datas.actualQuestionId)
      dbDatas.actualQuestionId = datas.actualQuestionId;

    if (datas.scores)
      dbDatas.scores = datas.scores.map((s) => Score.fromFrontToDb(s));

    return dbDatas;
  }

  public getActualPlayerIndex(): number {
    return Game.getPlayerIndex(
      this.actualTurn,
      this.nbTurns,
      this.allUsers.length,
      this.displayId
    );
  }

  public getActualplayer(): User | DummyUser {
    let userIndex = Game.getPlayerIndex(
      this.actualTurn,
      this.nbTurns,
      this.allUsers.length,
      this.displayId
    );

    return this.allUsers[userIndex];
  }

  public static getPlayerIndex(
    actualTurn: number,
    nbTurns: number,
    nbPlayers: number,
    seed: string
  ): number {
    let rng = seedRandom(seed);

    let playersNbTurns: number[] = [...new Array(nbPlayers)].fill(
      Math.ceil(nbTurns / nbPlayers)
    );

    function choosePlayer(): number {
      let choosedPlayer = Math.floor(rng() * nbPlayers);

      if (playersNbTurns[choosedPlayer] === 0) {
        return choosePlayer();
      }

      return choosedPlayer;
    }

    let choosedPlayer = 0;

    for (let i = 0; i < actualTurn; i++) {
      choosedPlayer = choosePlayer();

      playersNbTurns[choosedPlayer] = playersNbTurns[choosedPlayer] - 1;
    }

    return choosedPlayer;
  }
}

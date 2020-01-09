export class GameType {
  private _id: number = 0;
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  private _name: string = "";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<GameType>): GameType {
    return Object.assign(new GameType(), datas);
  }
}

export const gameTypes: GameType[] = [
  GameType.New({ id: 0, name: "Party" }),
  GameType.New({ id: 1, name: "Online" })
];

export interface UserConfigModel {
  darkMode: boolean;
  language: string;
}

export class UserConfig {
  private _darkMode: boolean = true;
  public get darkMode(): boolean {
    return this._darkMode;
  }
  public set darkMode(value: boolean) {
    this._darkMode = value;
  }

  private _language: string = "";
  public get language(): string {
    return this._language;
  }
  public set language(value: string) {
    this._language = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<UserConfig>): UserConfig {
    return Object.assign(new UserConfig(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<UserConfig> {
    let r = new UserConfig();

    r.darkMode = datas.darkMode;
    r.language = datas.language;

    return r;
  }

  public static fromFrontToDb(datas: any): Partial<UserConfigModel> {
    let dbDatas: Partial<UserConfigModel> = {
      darkMode: datas.darkMode,
      language: datas.language,
    };

    return dbDatas;
  }
}

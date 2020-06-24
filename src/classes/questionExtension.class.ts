// import { User } from "./user.class";

// export interface QuestionExtensionModel {
//   additionalUserIds: string[];
// }

// export class QuestionExtension {
//   private _darkMode: boolean = true;
//   public get darkMode(): boolean {
//     return this._darkMode;
//   }
//   public set darkMode(value: boolean) {
//     this._darkMode = value;
//   }

//   private _language: string = "";
//   public get language(): string {
//     return this._language;
//   }
//   public set language(value: string) {
//     this._language = value;
//   }

//   /**
//    *
//    */
//   constructor() {}

//   public static New(datas: Partial<QuestionExtension>): QuestionExtension {
//     return Object.assign(new QuestionExtension(), datas);
//   }

//   public static async fromDbToClass(datas: any): Promise<QuestionExtension> {
//     let r = new QuestionExtension();

//     r.darkMode = datas.darkMode;
//     r.language = datas.language;

//     return r;
//   }

//   public static fromFrontToDb(datas: any): Partial<QuestionExtensionModel> {
//     let dbDatas: Partial<QuestionExtensionModel> = {
//       darkMode: datas.darkMode,
//       language: datas.language,
//     };

//     return dbDatas;
//   }
// }

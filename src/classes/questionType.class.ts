import { NullableId } from "@feathersjs/feathers";
import { QuestionTemplate } from "./questionTemplate.class";
import app from "../app";

export interface QuestionTypeModel {
  _id: NullableId;
  name: string;
  description: string;
  templateId: NullableId;
  icon: string;
  hasQuestions: boolean;
}

enum QuestionTypeErrors {
  NotFound = "QuestionType Not Found",
  name = "Invalid Name",
  description = "Invalid Description",
  template = "Invalid Template",
  QuestionsAssigned = "Questions are assigned to this type",
}

export class QuestionType {
  static readonly Errors = QuestionTypeErrors;

  private _id: NullableId = null;
  public get id(): NullableId {
    return this._id;
  }
  public set id(value: NullableId) {
    this._id = value;
  }

  private _name: string = "";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  private _description: string = "";
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  private _template: QuestionTemplate = new QuestionTemplate();
  public get template(): QuestionTemplate {
    return this._template;
  }
  public set template(value: QuestionTemplate) {
    this._template = value;
  }

  private _icon: string = "";
  public get icon(): string {
    return this._icon;
  }
  public set icon(value: string) {
    this._icon = value;
  }

  private _hasQuestions: boolean = false;
  public get hasQuestions(): boolean {
    return this._hasQuestions;
  }
  public set hasQuestions(value: boolean) {
    this._hasQuestions = value;
  }

  /**
   *
   */
  constructor() {}

  public static New(datas: Partial<QuestionType>): QuestionType {
    return Object.assign(new QuestionType(), datas);
  }

  public static async fromDbToClass(datas: any): Promise<QuestionType> {
    let r = new QuestionType();

    r.id = datas._id;
    r.name = datas.name;
    r.description = datas.description;
    r.hasQuestions = datas.hasQuestions;
    r.icon = datas.icon;

    try {
      r.template = await app.services["question-templates"].get(
        datas.templateId as string
      );
    } catch (error) {
      if (error.code === 404) r.template = new QuestionTemplate();
      else throw error;
    }

    return r;
  }

  public static fromClassToDb(
    questionType: QuestionType
  ): Partial<QuestionTypeModel> {
    let dbDatas: Partial<QuestionTypeModel> = {
      name: questionType.name,
      description: questionType.description,
      hasQuestions: questionType.hasQuestions,
      templateId: questionType.template.id,
      icon: questionType.icon,
    };

    return dbDatas;
  }

  public static fromFrontToDb(datas: any): Partial<QuestionTypeModel> {
    let dbDatas: Partial<QuestionTypeModel> = {
      name: datas.name,
      description: datas.description,
      hasQuestions: datas.hasQuestions,
      icon: datas.icon,
    };

    if (datas.template) dbDatas.templateId = datas.template.id;
    else if (datas.templateId) dbDatas.templateId = datas.templateId;

    return dbDatas;
  }
}

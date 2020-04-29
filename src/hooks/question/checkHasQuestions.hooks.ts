import { Hook, HookContext } from "@feathersjs/feathers";

import { QuestionType } from "../../classes/questionType.class";
import app from "../../app";
import { Question } from "../../classes/question.class";

export const beforeUpsertHook = (options = {}): Hook => {
  return async (context: HookContext) => {
    const questionTypeId = context.data.typeId;

    const checkType = async () => {
      const questionType = (await context.app.services["question-types"].get(
        questionTypeId
      )) as QuestionType;

      if (!questionType.hasQuestions) {
        await app.services["question-types"].patch(
          questionType.id,
          {
            ...QuestionType.fromClassToDb(questionType),
            hasQuestions: true,
          },
          context.params
        );
      }
    };

    checkType();

    return context;
  };
};

export const beforeRemoveHook = (options = {}): Hook => {
  return async (context: HookContext) => {
    const questionId = context.id;

    const questionType = ((await context.app.services["questions"].get(
      questionId
    )) as Question).type;

    const checkType = async () => {
      console.log(questionType.hasQuestions);

      if (questionType.hasQuestions) {
        const questions = (await context.app.services["questions"].find({
          query: { typeId: questionType.id?.toString() },
        })) as Question[];
        console.log(questions.length);

        if (
          questions.length === 0 ||
          (questions.length === 1 && questions[0].id?.toString() === questionId)
        ) {
          try {
            await context.app.services["question-types"].patch(
              questionType.id,
              {
                ...QuestionType.fromClassToDb(questionType),
                hasQuestions: false,
              },
              context.params
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    checkType();

    return context;
  };
};

// export function beforeRemoveHook(options = {}): Hook {
//   return async (context: HookContext) => {
//     console.log(context);

//     const question = await apiHandler.questionService.featherService.get(
//       context.id!
//     );

//     const checkType = async (typeId: string) => {
//       const questions = await apiHandler.questionService.featherService.find({
//         query: { typeId },
//       });
//       console.log(questions);
//       // if (type.hasQuestions) {

//       // }
//     };

//     checkType(question.type.id);
//   };
// }

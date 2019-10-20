// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import * as Helper from './hookHelpers';
import { Game } from '../classes/game.class';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const method = context.method;
    const oldData = context.data;
    let newData: any = {};

    if (!(oldData instanceof Game)) {
      if (method === 'create' || method === 'update' || method === 'patch') {
        newData.displayId = Helper.validateString(
          oldData,
          'displayId',
          Game.Errors
        );
        newData.name = Helper.validateString(oldData, 'name', Game.Errors);
        newData.nbTurns = Helper.validateNumber(
          oldData,
          'nbTurns',
          Game.Errors
        );
        newData.actualTurn = Helper.validateNumber(
          oldData,
          'actualTurn',
          Game.Errors
        );
        newData.maxDifficulty = Helper.validateNumber(
          oldData,
          'maxDifficulty',
          Game.Errors
        );
        newData.maxHotLevel = Helper.validateNumber(
          oldData,
          'maxHotLevel',
          Game.Errors
        );

        context.data = newData;
      }
    }

    return context;
  };
};

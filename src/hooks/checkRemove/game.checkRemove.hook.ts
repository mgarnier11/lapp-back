// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import gameCheckPatchHook from "../checkPatch/game.checkPatch.hook";

export default (options = {}): Hook => {
  return gameCheckPatchHook(options);
};

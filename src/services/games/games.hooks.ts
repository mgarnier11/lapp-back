import * as authentication from "@feathersjs/authentication";
import gameValidateHook from "../../hooks/validate/game.validate.hook";
import gameCheckRemoveHook from "../../hooks/checkRemove/game.checkRemove.hook";
import gameCheckPatchHook from "../../hooks/checkPatch/game.checkPatch.hook";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt"), gameValidateHook()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [gameCheckPatchHook()],
    remove: [gameCheckRemoveHook()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

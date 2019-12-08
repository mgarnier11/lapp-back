import * as authentication from "@feathersjs/authentication";
import questionTypeValidateHook from "../../hooks/validate/question-type.validate.hook";
import checkPermissions from "../../hooks/checkPermissions";
import questionTypecheckRemove from "../../hooks/checkRemove/question-type.checkRemove.hook";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [/*authenticate("jwt"),*/ questionTypeValidateHook()],
    find: [],
    get: [],
    create: [checkPermissions(100)],
    update: [checkPermissions(100)],
    patch: [checkPermissions(100)],
    remove: [checkPermissions(100), questionTypecheckRemove()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
